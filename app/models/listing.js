
'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var listingSchema = new Schema({
  listingName: String
  listingLocation: String
  listingPricePerNight: String
  listingNumberOfRooms: String
  listingDescription: String
  listingPetFriendlyTrue: Boolean
});

 mongoose.model("Listing", listingSchema);



// db.createCollection("listings", {
//   validator: {
//     $or: [{
//         id: {
//           $type: "serial"
//         }
//       },
//       {
//         name: {
//           $type: "string"
//         }
//       },
//       {
//         price: {
//           $type: "string"
//         }
//       },
//       {
//         location: {
//           $type: "string"
//         }
//       },
//       {
//         lister: {
//           $type: "string"
//         }
//       },
//       {
//         numberOfGuests: {
//           $type: "string"
//         }
//       },
//       {
//         numberOfRooms: {
//           $type: "string"
//         }
//       },
//       {
//         description: {
//           $type: "string"
//         }
//       },
//       {
//         smoking: {
//           $type: "string"
//         }
//       },
//       {
//         pets: {
//           $type: "string"
//         }
//       },
//     ]
//   }
// });
