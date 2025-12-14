import { useState, useEffect } from "react";
import styled from "styled-components";

function ProductForm({ onSubmit, initialData, onCancel }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setPrice(initialData.price?.toString() || "");
      setDescription(initialData.description || "");
      setCategory(initialData.category || "");
      setImage(initialData.image || "");
    }
  }, [initialData]);

  function validate() {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "El nombre es obligatorio.";

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      newErrors.price = "El precio debe ser mayor a 0.";
    }

    if (description.trim().length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres.";
    }

    if (!category.trim()) {
      newErrors.category = "La categoría es obligatoria.";
    }

    if (!image.trim()) {
      newErrors.image = "Debes ingresar una URL de imagen.";
    } else if (!image.startsWith("http")) {
      newErrors.image = "Debe ser una URL válida que comience con http/https.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name,
      price: parseFloat(price),
      description,
      category,
      image,
    });

    if (!initialData) {
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
    }

    setErrors({});
  }

  return (
    <Form onSubmit={handleSubmit} aria-label="Formulario de producto">
      <h2>{initialData ? "Editar Producto" : "Agregar Producto"}</h2>

      <Field>
        <label>Nombre</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <Error>{errors.name}</Error>}
      </Field>

      <Field>
        <label>Precio</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        {errors.price && <Error>{errors.price}</Error>}
      </Field>

      <Field>
        <label>Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <Error>{errors.description}</Error>}
      </Field>

      <Field>
        <label>Categoría</label>
        <input
          type="text"
          placeholder="Ej: bebidas, electrónica..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {errors.category && <Error>{errors.category}</Error>}
      </Field>

      <Field>
        <label>Imagen (URL)</label>
        <input
          type="text"
          placeholder="https://ejemplo.com/foto.png"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {errors.image && <Error>{errors.image}</Error>}
      </Field>

      <ButtonRow>
        <SubmitButton type="submit">
          {initialData ? "Guardar cambios" : "Crear"}
        </SubmitButton>

        <CancelButton type="button" onClick={onCancel}>
          Cancelar
        </CancelButton>
      </ButtonRow>
    </Form>
  );
}

export { ProductForm };
export default ProductForm;

/* Styled components */
const Form = styled.form`
  border: 1px solid #444;
  padding: 20px;
  border-radius: 8px;
  max-width: 350px;
  background: #eee;
`;

const Field = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 6px;
    font-weight: 600;
  }

  input,
  textarea {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

const Error = styled.small`
  color: red;
  margin-top: 5px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const SubmitButton = styled.button`
  background: #004aad;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: #999;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
