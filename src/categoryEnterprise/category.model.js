import { Schema, model } from "mongoose";

const categorySchema = Schema(
  {
    categoriaEmpresarial: {
      type: String,
      required: [true, "La categoria es obligatoria"],
      maxLength: [25, "La categoria no puede ser mayor a 25 caracteres"],
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);

categorySchema.methods.toJson = function () {
  const { _id, ...category } = this.toObject();
  category.cid = _id;
  return category;
};

export default model("Category", categorySchema);
