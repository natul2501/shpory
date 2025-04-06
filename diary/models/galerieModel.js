import mongoose from 'mongoose';
import { title } from 'process';

const galerieSchemaObj = new mongoose.Schema({
    thema: { type: String},                         //тема, по якій картинки будуть сортуватися в галереї
    title: {type: mongoose.Schema.Types.Mixed},     //опис зображення
    articleId: { type: String},                     //стаття, в якій згадується картинка
    imgLink: { type: String},                       //посилання на картинку
    show: { type: String},                          //хто може бачити в галереї
    viewers: { type: mongoose.Schema.Types.Mixed }  //архів вибраних користувачів, яким видно статтю (якщо show = userlist)
});

const galerieSchema = new mongoose.Schema({
    flysqGalerie: [galerieSchemaObj],           //останні додані коментарі flysquirrel-diary
    robGalerie: [galerieSchemaObj]              //останні додані коментарі robert-diary
});
const newGalerieModel = mongoose.model("galeries", galerieSchema);

export default newGalerieModel;