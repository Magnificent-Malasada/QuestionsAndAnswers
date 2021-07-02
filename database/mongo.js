let productSchema = new Schema({
    _id: {
      type: Number,
      unique: true
    },
    questions: [
      // array of references to Questions document
    ]
  });

let questionsSchema = new Schema({
    _id: {
      type: Number,
      unique: true
    },
    body: String,
    date: {
      type: Date,
      default: Date.now
    }
    asker_name: String,
    asker_email: String,
    helpfulness: Number,
    reported: Boolean,
    answers: [
      // array of references to Answers document
    ]
  });

let answersSchema = new Schema({
    _id: {
      type: Number,
      unique: true
    },
    body: String,
    date: {
      type: Date,
      default: Date.now
    }
    answerer_name: String,
    answerer_email: String,
    helpfulness: Number,
    reported: Boolean,
    photos: [
      // array of references to Photos document
    ]
  });

let photosSchema = new Schema({
    _id: {
      type: Number,
      unique: true
    },
    photo_url: String
  });