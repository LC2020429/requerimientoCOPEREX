import User from "../user/user.model.js";
import Category from "../categoryEnterprise/category.model.js";
import Enterprise from "../enterprise/enterprise.model.js";

export const nombreEmpresaExists = async (nombreEmpresa = "") => {
  const existe = await Enterprise.findOne({ nombreEmpresa });
  if (existe) {
    throw new Error(
      `La empresa con el nombre ${nombreEmpresa} ya está registrada`
    );
  }
};

export const nitExists = async (nit = "") => {
  const existe = await Enterprise.findOne({ nit });
  if (existe) {
    throw new Error(`La empresa con el NIT ${nit} ya está registrada`);
  }
};

export const emailExists = async (email = "") => {
  const existe = await User.findOne({ email });
  if (existe) {
    throw new Error(`The email ${email} is already registered`);
  }
};

export const usernameExists = async (username = "") => {
  const existe = await User.findOne({ username });
  if (existe) {
    throw new Error(`The username ${username} is already registered`);
  }
};

export const userExists = async (uid = " ") => {
  const existe = await User.findById(uid);
  if (!existe) {
    throw new Error("No existe el usuario con el ID proporcionado");
  }
};

export const categoryExists = async (cid = "") => {
  const existe = await Category.findById(cid);
  if (!existe) {
    throw new Error("No existe la categoría con el ID proporcionado");
  }
};

export const enterpriseExists = async (eid = "") => {
  const existe = await Enterprise.findById(eid);
  if (!existe) {
    throw new Error("No existe la empresa con el ID proporcionado");
  }
};
