import axios from 'axios';
import querystring from 'querystring'

class CdekModel  {
  async fetchAccessToken() {
    try {
      const response = await axios.post(
        'https://api.cdek.ru/v2/oauth/token?parameters',
        querystring.stringify({
          grant_type: 'client_credentials',
          client_id: 'Dqsnv0ptuXpDUzOYxGgCn3f9cA2cQLW9',
          client_secret: 'bYaN281Li7jbNuMUKpk23eXzyxctb2p0',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error('Ошибка получения токена доступа:', error);
      return null;
    }
  }

  async getRegions(accessToken) {
    try {
      const response = await axios.get('https://api.cdek.ru/v2/location/regions?country_codes=RU', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Ошибка получения данных о регионах:', error);
      return null;
    }
  }

  async getCities(accessToken, regionCode) {
    try {
      // 1. Получаем список ПВЗ
      const deliveryPointsResponse = await axios.get(`https://api.cdek.ru/v2/deliverypoints?region_code=${regionCode}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      const uniqueCityCodes = new Set(deliveryPointsResponse.data.map(item => item.location.city_code));
      // 2. Получаем список городов с region_codes
      const citiesResponse = await axios.get(`https://api.cdek.ru/v2/location/cities?region_code=${regionCode}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      // 3. Фильтруем города, оставляя только те, где есть ПВЗ
      const citiesWithPvz = citiesResponse.data.filter(city => uniqueCityCodes.has(city.code));

      return citiesWithPvz; // Отправляем ответ на клиент
    } catch (error) {
      console.error('Ошибка получения данных:', error);
      throw error; // Перебрасываем ошибку для обработки в контроллере
    }
  }

  async getOffices(accessToken, cityCode) { 
    try {
      const response = await axios.get(`https://api.cdek.ru/v2/deliverypoints?city_code=${cityCode}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Ошибка получения данных о пвз:', error);
      return null;
    }
  }

    
    async getRatesPvz(accessToken, cityCode) {
   
        try {
            const requestData = {
                tariff_code: 136,
                from_location: {
                    code: 137
                },
                to_location: {
                    code: cityCode
                },
                
                
                packages: [
                    {
                        height: 5,
                        length: 80,
                        weight: 2000,
                        width: 50
                    }
                ]
            };

            console.log(JSON.stringify(requestData, null, 2));
            const response = await axios.post('https://api.cdek.ru/v2/calculator/tariff', JSON.stringify(requestData), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Ошибка получения данных о тарифах:', error);
            return null;
        }
    }

    async getRatesDelivery(accessToken, cityCode) {
   
        try {
            const requestData = {
                tariff_code: 137,
                from_location: {
                    code: 137
                },
                to_location: {
                    code: cityCode
                },
                
                
                packages: [
                    {
                        height: 5,
                        length: 80,
                        weight: 2000,
                        width: 50
                    }
                ]
            };

            console.log(JSON.stringify(requestData, null, 2));
            const response = await axios.post('https://api.cdek.ru/v2/calculator/tariff', JSON.stringify(requestData), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Ошибка получения данных о тарифах:', error);
            return null;
        }
    }

    async createOrderCdek(accessToken, name, surname, phone, codepvz, totalamount, citycode) {
        console.log(name, surname, phone, codepvz, totalamount, citycode)
        try {
            const tariffResponse = await axios.post('https://api.cdek.ru/v2/calculator/tariff', {
                tariff_code: 136,
                from_location: {
                  code: 137
                },
                to_location: {
                  code: citycode
                },
                packages: [
                  {
                    height: 5,
                    length: 80,
                    weight: 2000,
                    width: 50
                  }
                ]
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${accessToken}`
                }
              });
          
              // Извлечение total_sum из ответа о тарифах
              const total_sum = tariffResponse.data.total_sum + 100;

            const requestData = {
                delivery_recipient_cost : {
                    value : total_sum
                },
                shipment_point: 'SPB203',
                delivery_point: codepvz,
                packages : [ {
                    number : "bar-001",
                    comment : "Упаковка",
                    items : [ {
                        ware_key : "00055",
                        payment : {
                            value : totalamount
                        },
                        name : "Товар",
                        cost : 6000,
                        amount : 1,
                        weight : 2000,
                        url : "www.savaks.ru"
                    } ],
                    height: 5,
                    length: 80,
                    weight: 2000,
                    width: 50
                } ],
                    recipient: {
                        name: `${name} ${surname}`,
                        phones : [ {
                            number : phone
                        } ]
                    },
                tariff_code : 136
                        };

            console.log(JSON.stringify(requestData, null, 2));

            const response = await axios.post('https://api.cdek.ru/v2/orders', JSON.stringify(requestData), {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Ошибка получения данных о тарифах:', error);
            return null;
        }
    }

    async createOrderCdekDelivery(accessToken, name, surname, phone, totalamount, citycode, street, home, flat) {
        try {
            // Получение данных о тарифах
            const tariffResponse = await axios.post('https://api.cdek.ru/v2/calculator/tariff', {
              tariff_code: 137,
              from_location: {
                code: 137
              },
              to_location: {
                code: citycode
              },
              packages: [
                {
                  height: 5,
                  length: 80,
                  weight: 2000,
                  width: 50
                }
              ]
            }, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
              }
            });
        
            // Извлечение total_sum из ответа о тарифах
            const total_sum = tariffResponse.data.total_sum + 100;
        
            // Создание заказа
            const requestData = {
              delivery_recipient_cost: {
                value: total_sum
              },
              shipment_point: 'SPB203',
              packages: [
                {
                  number: "bar-001",
                  comment: "Упаковка",
                  items: [
                    {
                      ware_key: "00055",
                      payment: {
                        value: totalamount
                      },
                      name: "Товар",
                      cost: 6000,
                      amount: 1,
                      weight: 2000,
                      url: "www.savaks.ru"
                    }
                  ],
                  height: 5,
                  length: 80,
                  weight: 2000,
                  width: 50
                }
              ],
              to_location: {
                code: citycode,
                address: `ул. ${street}, д. ${home}, кв. ${flat}`
              },
              recipient: {
                name: `${name} ${surname}`,
                phones: [
                  {
                    number: phone
                  }
                ]
              },
              tariff_code: 137
            };
        
            const orderResponse = await axios.post('https://api.cdek.ru/v2/orders', JSON.stringify(requestData), {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
              }
            });
        
            return orderResponse.data;
          } catch (error) {
            console.error('Ошибка:', error);
            return null;
          }
        }
    

    async getOrderCdek(accessToken) {
        try {
          const response = await axios.get('https://api.cdek.ru/v2/orders/72753034-ee68-4bf0-8af9-e3f423ccbe35', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          return response.data;
        } catch (error) {
          console.error('Ошибка получения данных о заказе:', error);
          return null;
        }
      }


};

export default new CdekModel;

