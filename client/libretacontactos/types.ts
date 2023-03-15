interface Contacto {
    id?: number;
    nombre: string;
    telefono: string;
    correo: string;
  }
  
  interface ContactoProps {
    contacto: Contacto;
    onDelete: (id: number) => void;
  }
  
  interface ContactoFormProps {
    contacto: Contacto;
    onSubmit: (contacto: Contacto) => void;
  }