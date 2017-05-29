import { RequestMethod, Controller, RequestMapping } from 'nest.js';
import { EventsService } from './events.service';

@Controller({ path: 'api/events' })
export class EventsController {

    constructor(private eventSrv: EventsService) {}

    @RequestMapping({ path: '', method: RequestMethod.GET })
    async getCurrentEvents(req, res) { 
        let events = await this.eventSrv.getEvents();
        res.send(events);
    }

    @RequestMapping({ path: '/all', method: RequestMethod.GET })
    async getAllInfoOfEvents(req, res) { 
        let events = await this.eventSrv.getAllInfoOfEvents();
        res.send(events);
    }

    @RequestMapping({ path: '', method: RequestMethod.POST })
    async createEvent(req, res) { 
        let event = await this.eventSrv
            .createEvent(req.body.name, req.body.startDate, req.body.description, req.body.urlLoc, req.body.endDate);
        res.send(event);
    }

    @RequestMapping({ path: '', method: RequestMethod.PUT })
    async editEvent(req, res) { 
        let updateResult = await this.eventSrv.editEvent(req.body.eventToModify);
        res.send(updateResult);
    }

    @RequestMapping({ path: '/delete', method: RequestMethod.POST })
    async deleteEvents(req, res) { 
        let deleteResult = await this.eventSrv.deleteEvents(req.body.eventIds);
        res.send(deleteResult);
    }

}