import { Schema, model } from "mongoose";

const empresaSchema = new Schema(
  {
    nombreEmpresa: {
      type: String,
      maxlength: [
        50,
        "El nombre de la empresa no puede superar los 50 caracteres",
      ],
      unique: true,
      required: true,
    },
    direccion: {
      type: String,
      maxlength: [
        50,
        "La dirección de la empresa no puede superar los 50 caracteres",
      ],
      required: true,
    },
    rtuEmpresa: {
      type: String,
      required: true,
    },
    nit: {
      type: String,
      maxlength: 8,
      minlength: 8,
      required: true,
      unique: true,
    },
    telefono: {
      type: String,
      maxlength: 8,
      minlength: 8,
      required: true,
    },
    nombreContacto: {
      type: String,
      maxlength: [
        50,
        "El nombre del contacto no puede superar los 50 caracteres",
      ],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    anoFundacion: {
      type: Number,
      required: true,
    },
    anoRegistroInterFer: {
      type: Number,
      default: new Date().getFullYear(), // Año actual cuando se crea el documento
    },
    estado: {
      type: Boolean,
      default: true,
    },
    nivelImpacto: {
      type: String,
      enum: ["Bajo", "Medio", "Alto", "Líder del mercado"],
      required: true,
      default: "Medio",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "El id de la categoría es obligatoria"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

empresaSchema.virtual("anosTrayectoria").get(function () {
  return new Date().getFullYear() - this.anoFundacion;
});

empresaSchema.virtual("registroInterFerInfo").get(function () {
  return {
    añoRegistro: this.anoRegistroInterFer,
    añosTranscurridos: new Date().getFullYear() - this.anoRegistroInterFer,
  };
});

empresaSchema.methods.toJSON = function () {
  const { _id, ...empresa } = this.toObject();
  empresa.eid = _id;
  return empresa;
};

export default model("Enterprise", empresaSchema);
