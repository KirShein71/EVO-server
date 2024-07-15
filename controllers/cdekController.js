import CdekModel from "../models/CdekModel.js";

class CdekController {
  async getRegions(req, res) {
    const accessToken = await CdekModel.fetchAccessToken();
    
    if (accessToken) {
      const regions = await CdekModel.getRegions(accessToken);
      res.json(regions);
    } else {
      res.status(500).json({ error: 'Ошибка получения данных' });
    }
  }


    async getCities(req, res) {
        const accessToken = await CdekModel.fetchAccessToken();
        const regionCode = req.params.region
        
        if (accessToken) {
            try {
                const cities = await CdekModel.getCities(accessToken, regionCode);
                res.json(cities);
            } catch (error) {
                res.status(500).json({ error: 'Ошибка получения данных' });
            }
        
        } else {
        res.status(500).json({ error: 'Ошибка авторизации' });
        }
    }

  async getOffices(req, res) {
    const accessToken = await CdekModel.fetchAccessToken();
    const cityCode = req.params.city;

    if (accessToken) {
      try {
        const offices = await CdekModel.getOffices(accessToken, cityCode);
        res.json(offices); 
      } catch (error) {
        res.status(500).json({ error: 'Ошибка получения данных' });
      }
    } else {
      res.status(500).json({ error: 'Ошибка авторизации' });
    }
}

async getRatesPvz(req, res) {
    const accessToken = await CdekModel.fetchAccessToken();
    const cityCode = req.params.city;

    if (accessToken) {
      try {
        const offices = await CdekModel.getRatesPvz(accessToken, cityCode);
        res.json(offices); 
      } catch (error) {
        res.status(500).json({ error: 'Ошибка получения данных' });
      }
    } else {
      res.status(500).json({ error: 'Ошибка авторизации' });
    }
}

async getRatesDelivery(req, res) {
    const accessToken = await CdekModel.fetchAccessToken();
    const cityCode = req.params.city;

    if (accessToken) {
      try {
        const offices = await CdekModel.getRatesDelivery(accessToken, cityCode);
        res.json(offices); 
      } catch (error) {
        res.status(500).json({ error: 'Ошибка получения данных' });
      }
    } else {
      res.status(500).json({ error: 'Ошибка авторизации' });
    }
}

    async createOrderCdek(req, res) {
        const accessToken = await CdekModel.fetchAccessToken();
        const {name, surname, phone, codepvz, totalamount, citycode} = req.body
        if (accessToken) {
       
        const order = await CdekModel.createOrderCdek(accessToken, name, surname, phone, codepvz, totalamount, citycode);
        res.json(order);
        } else {
        res.status(500).json({ error: 'Ошибка получения данных' });
        }
    }

    async createOrderCdekDelivery(req, res) {
        const accessToken = await CdekModel.fetchAccessToken();
        const {name, surname, phone, totalamount, citycode, street, home, flat} = req.body
        if (accessToken) {
       
        const order = await CdekModel.createOrderCdekDelivery(accessToken, name, surname, phone, totalamount,citycode, street, home, flat);
        res.json(order);
        } else {
        res.status(500).json({ error: 'Ошибка получения данных' });
        }
    }

    async getOrderCdek(req, res) {
        const accessToken = await CdekModel.fetchAccessToken();
        
        if (accessToken) {
          const order = await CdekModel.getOrderCdek(accessToken);
          res.json(order);
        } else {
          res.status(500).json({ error: 'Ошибка получения данных' });
        }
      }




}
export default new CdekController()