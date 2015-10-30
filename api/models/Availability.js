/**
* Availability.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    date: {
      type: 'string',
      required: true,
    },
    hours: {
      type: 'string',
      required: true,
      enum: ['18:00', '18:30', '19:00'],
    },
    mode: {
      type: 'string',
      required: true,
      enum: ['unknown', 'available', 'perhaps', 'unavailable'],
    }
  },
};
