import { Component } from 'nest.js';
import { Event, EventModel } from './../schemas/Event';

@Component()
export class EventsService {

    getEvents(): Promise<Array<Event>> {
        return new Promise((resolve, reject) => {
            EventModel.find({ enabled: true }, { name: 1, _id: 0 }, (err, events: Array<Event>) => {
                if(err) reject(err);
                resolve(events);
            });
        });
    }

    getAllInfoOfEvents(): Promise<Array<Event>> {
        return new Promise((resolve, reject) => {
            EventModel.find({}, (err, events: Array<Event>) => {
                if(err) reject(err);
                resolve(events);
            });
        });
    }

    createEvent(name: string, startDate: Date, description: string, urlLoc: string, endDate: Date) {
        return new Promise((resolve, reject) => {
            EventModel.create({
                name: name,
                description: description,
                date: {
                    startDate: startDate,
                    endDate: endDate
                },
                urlLoc: urlLoc,
                enabled: true
            }, (err, event) => {
                if(err) reject(err);
                resolve(event);
            })
        });
    }

    editEvent(eventToModify: Event) {
        return new Promise((resolve, reject) => {
            EventModel.update({ _id: eventToModify._id }, { 
                $set: {
                    name: eventToModify.name,
                    description: eventToModify.description,
                    date: {
                        startDate: eventToModify.date.start,
                        endDate: eventToModify.date.end
                    },
                    urlLoc: eventToModify.urlLoc,
                    enabled: eventToModify.enabled
                }
            }, (err, r) => {
                if(err) reject(err);
                resolve(r);
            });
        });
    }

    deleteEvents(idsToDelete) {
        return new Promise((resolve, reject) => {
            EventModel.remove({ _id: { $in: idsToDelete }}, (err) => {
                if(err) reject(err);
                resolve(true);
            });
        });
    }

}