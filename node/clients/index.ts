import { IOClients } from '@vtex/api'
import { SportmonksClient } from './sportmonks'

export class Clients extends IOClients {
  get sportmonks() {
    return this.getOrSet('sportmonks', SportmonksClient)
  }
}
