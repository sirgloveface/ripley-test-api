import WeatherException from "../exceptions/weather.exception"
import chalk from "chalk";
import http from 'http'
import axios from "axios"
import redis from "redis"
import moment from 'moment'

class Weather {
  constructor() {
    this._logger = chalk;
    this._socket = null
    this._client = redis.createClient(process.env.REDISCLOUD_URL || 6379)
    console.log(`${this._logger.green('[ Weather controller ] ')} constructor`)
  }
  
  async getData(data) {
   return await this.checkLatitudeData(data)
  }

  async getWeather(req, res) {
      console.log(`${this._logger.green("[ getWeather controller ]")}`)
      try {
         // Simulacion 10 % error
         if (Math.random(0, 1) < 0.1) {
          this.getWeather(req, res)
           //throw new Error('How unfortunate! The API Request Failed')
         }
         const dataRedisKey = `latitude:coord:${req.params.coor}`
         this._client.get(dataRedisKey,async (err, data) => {
            // If that key exists in Redis store
            let response = { }
             if (data) {
               response = JSON.parse(data)
               console.log({ source: dataRedisKey, data: JSON.stringify(response) })
              } else {
                response = await this.getData(req.params.coor)
                this._client.setex(dataRedisKey, 3600, JSON.stringify(response))      
              }
              res.send({ "time" :  moment.unix(response.currently.time).format("DD-MM-YYYY h:mm:ss"), 
              "temperature" : response.currently.temperature,
               "timezone": response.timezone,
               "summary": response.currently.summary })  
       })
    }
      catch(e) {
        console.log(`${this._logger.red('[ Disconnect ] ')} result: ${e}`)
        if(e == "Error: How unfortunate! The API Request Failed") {
          console.log("error");
         await this.saveRedis(e, 'api.errors');
        }
        return res.status(500).send(e)
      }
}

async checkLatitudeData(latitude) {
   console.log(`${this._logger.green('[ Init checkLatitudeData ] ')} latitude: ${latitude}`)
    const options = {
      method: "GET",
      url: `https://api.darksky.net/forecast/388618f7e4a94de1cc1058ef30f6e167/${latitude}?units=si&&lang=es`
    }
    try {
      return await this.callRest(options)    
    }
    catch(e) {
      console.log(`${this._logger.red('[ Error checkLatitudeData ] ')} -> : ${e}`)
      return {}
    }
}

async saveRedis(message, dataRedisKeyHash) {
 // const dataRedisKeyHash = 'api.errors'
  return new Promise((resolve, reject) => {
    redisClient.hmset(dataRedisKeyHash, {[speciesName] : JSON.stringify(message)},
     (err, response) => {
      if(err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}
async callRest(options) {
    return await new Promise((resolve, reject) => {
      options.httpAgent = new http.Agent({
        rejectUnauthorized: false
      })
      axios(options)
        .then(response => {
          let respuesta = response.data;
          if (respuesta.Error == null) {
           console.log(`${this._logger.green('[ callRest ] ')} result: ${JSON.stringify(respuesta)}`)
            return resolve(respuesta)
          } else {
            console.log(`${this._logger.red('[ callRest ] ')} result: 400`)
            return reject(new WeatherException("400"))
          }
        })
        .catch(error => {
          console.log( error.response.status === 401 ? `${this._logger.green('[ callRest ] ')} result: ${error.response.data}` : `${this._logger.red('[ Error ] ')} result-: ${error.response.status}`)
          return  error.response.status === 401 ? resolve( { code: error.response.status, message: error.response.data } ) : reject(new WeatherException("500"))
        })
  })
}
}

const weatherController = new Weather()
export default weatherController


