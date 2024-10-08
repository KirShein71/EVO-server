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

async getRatesPackagePvz(req, res) {
    const accessToken = await CdekModel.fetchAccessToken();
    const cityCode = req.params.city;

    if (accessToken) {
      try {
        const offices = await CdekModel.getRatesPackagePvz(accessToken, cityCode);
        res.json(offices); 
      } catch (error) {
        res.status(500).json({ error: 'Ошибка получения данных' });
      }
    } else {
      res.status(500).json({ error: 'Ошибка авторизации' });
    }
}

async getRatesEconomPackagePvz(req, res) {
    const accessToken = await CdekModel.fetchAccessToken();
    const cityCode = req.params.city;

    if (accessToken) {
      try {
        const offices = await CdekModel.getRatesEconomPackagePvz(accessToken, cityCode);
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

async getRatesEconomDelivery(req, res) {
    const accessToken = await CdekModel.fetchAccessToken();
    const cityCode = req.params.city;

    if (accessToken) {
      try {
        const offices = await CdekModel.getRatesEconomDelivery(accessToken, cityCode);
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
        const {id, name, surname, phone, codepvz, totalamount, citycode, tariffcode} = req.body
        if (accessToken) {
       
        const order = await CdekModel.createOrderCdek(accessToken, id, name, surname, phone, codepvz, totalamount, citycode, tariffcode);
        res.json(order);
        } else {
        res.status(500).json({ error: 'Ошибка получения данных' });
        }
    }

    async createOrderCdekDelivery(req, res) {
        const accessToken = await CdekModel.fetchAccessToken();
        const {id, name, surname, phone, totalamount, citycode, street, home, flat, tariffcode} = req.body
        if (accessToken) {
       
        const order = await CdekModel.createOrderCdekDelivery(accessToken, id, name, surname, phone, totalamount,citycode, street, home, flat, tariffcode);
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