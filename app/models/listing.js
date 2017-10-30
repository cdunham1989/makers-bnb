db.createCollection("listings", {
  validator: {
    $or: [{
        id: {
          $type: "serial"
        }
      },
      {
        name: {
          $type: "string"
        }
      },
      {
        price: {
          $type: "string"
        }
      },
      {
        location: {
          $type: "string"
        }
      },
      {
        lister: {
          $type: "string"
        }
      },
      {
        numberOfGuests: {
          $type: "string"
        }
      },
      {
        numberOfRooms: {
          $type: "string"
        }
      },
      {
        description: {
          $type: "string"
        }
      },
      {
        smoking: {
          $type: "string"
        }
      },
      {
        pets: {
          $type: "string"
        }
      },
    ]
  }
});
