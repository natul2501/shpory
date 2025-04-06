import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
      author: { type: String},  // Автор коментаря
      date: { type: String },   // Дата коментаря (за замовчуванням поточна)
      time: { type: mongoose.Schema.Types.Mixed },                              //тимчасова
      timeStamp: {type: mongoose.Schema.Types.Mixed, default: () => Math.floor(Date.now() / 1000)},    //дата запису в секундах, для пошуку
      commentText: { type: String},
      commentLink: { type: mongoose.Schema.Types.Mixed },
      show: {type: String},
      viewers: { type: mongoose.Schema.Types.Mixed }      //архів вибраних користувачів, яким видно статтю (якщо show = userlist)
});

const articleSchema = new mongoose.Schema({
    thema: { type: String},                             //коротке описання, що показується в списку статей
    tags: { type: String},                              //теги
    date: { type: String, required: true },             //дата запису
    time: { type: String},                              //тимчасова
    timeStamp: {type: mongoose.Schema.Types.Mixed, default: () => Math.floor(Date.now() / 1000)},    //дата запису в секундах, для пошуку
    content: { type: String, required: true },          //текст запису
    comments: [commentSchema],                          //архів коментарів
    reactions: { type: mongoose.Schema.Types.Mixed },   //архів реакцій
    mood: { type: String },                             //посилання на фонову музику
    show:{ type: mongoose.Schema.Types.Mixed },         //показує, статтю видно всім читачам чи лише автору
    viewers: { type: mongoose.Schema.Types.Mixed }      //архів вибраних користувачів, яким видно статтю (якщо show = userlist)
});

const newArticleSchema = new mongoose.Schema({
    articlesFlysq: {type: Map,of: articleSchema},   //статті flysquirrel-diary
    flysqLastComment: [commentSchema],              //останні додані коментарі flysquirrel-diary
    articlesRob: {type: Map,of: articleSchema},     //статті robert-diary
    robLastComment: [commentSchema]                 //останні додані коментарі robert-diary
});
const newArticleModel = mongoose.model("diaries", newArticleSchema);

export default newArticleModel;