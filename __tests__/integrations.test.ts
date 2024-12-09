import '@testing-library/jest-dom';
import axios from 'axios';
import { api, getPosts, getUserPhoto, getUserByEmail, getUserById, getAllTherapist, getTherapistById } from "@/services/apiService";

jest.spyOn(api, 'get').mockImplementation(jest.fn());

describe("getPosts", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deberia buscar posts y retornar info relevante", async () => {
    const mockApiResponse = {
      data: [
          {
            id: 3,
            autor_id: 5,
            contenido: "No tengan miedo de buscar ayuda",
            createdAt: "2024-12-07T16:49:46.761Z",
            autor: {
              usuario: {
                nombre: "Rodrigo Fuentes",
                foto: null,
              },
              usuario_id: 9,
            },
          },
          {
            id: 2,
            autor_id: 5,
            contenido: "Recuerden siempre tomar descansos",
            createdAt: "2024-12-07T16:42:14.694Z",
            autor: {
              usuario: {
                nombre: "Rodrigo Fuentes",
                foto: null,
              },
              usuario_id: 9,
            },
          },
          {
            id: 1,
            autor_id: 5,
            contenido: "Probando esta funcionalidad",
            createdAt: "2024-12-07T16:18:59.827Z",
            autor: {
              usuario: {
                nombre: "Rodrigo Fuentes",
                foto: null,
              },
              usuario_id: 9,
            },
          },
      ],
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getPosts();

    expect(api.get).toHaveBeenCalledWith('publicaciones/');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result).toEqual([
        {
          id: 3,
          contenido: "No tengan miedo de buscar ayuda",
          createdAt: "2024-12-07T16:49:46.761Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "/images/default-profile.png",
          autorId: 9,
        },
        {
          id: 2,
          contenido: "Recuerden siempre tomar descansos",
          createdAt: "2024-12-07T16:42:14.694Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "/images/default-profile.png",
          autorId: 9,
        },
        {
          id: 1,
          contenido: "Probando esta funcionalidad",
          createdAt: "2024-12-07T16:18:59.827Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "/images/default-profile.png",
          autorId: 9,
        },
    ]);

  });
});

describe("getUser", () =>{
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("deberia buscar usuario y retornar su foto", async () => {
    const mockApiResponse = {
      data: {
        "id": 9,
        "nombre": "Rodrigo Fuentes",
        "email": "fuentes300hp@gmail.com",
        "tipo": "psicologo",
        "foto": "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
        "is_deleted": false,
        "createdAt": "2024-12-06T20:48:24.847Z"
      }
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getUserPhoto(9);

    expect(api.get).toHaveBeenCalledWith('/usuarios/9');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result).toEqual("https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg");

  });
  it("deberia buscar usuario y retornarlo basado en su email", async () => {
    const mockApiResponse = {
      data: {
        "id": 9,
        "nombre": "Rodrigo Fuentes",
        "email": "fuentes300hp@gmail.com",
        "tipo": "psicologo",
        "foto": "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
        "is_deleted": false,
        "createdAt": "2024-12-06T20:48:24.847Z"
      }
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getUserByEmail('fuentes300hp@gmail.com');

    expect(api.get).toHaveBeenCalledWith('/usuarios/login/fuentes300hp@gmail.com');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      "id": 9,
      "nombre": "Rodrigo Fuentes",
      "email": "fuentes300hp@gmail.com",
      "tipo": "psicologo",
      "foto": "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
      "is_deleted": false,
      "createdAt": "2024-12-06T20:48:24.847Z"
    });

  });
  it("deberia buscar usuario y retornarlo basado en su Id", async () => {
    const mockApiResponse = {
      data: {
        "id": 9,
        "nombre": "Rodrigo Fuentes",
        "email": "fuentes300hp@gmail.com",
        "tipo": "psicologo",
        "foto": "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
        "is_deleted": false,
        "createdAt": "2024-12-06T20:48:24.847Z"
      }
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getUserById('9');

    expect(api.get).toHaveBeenCalledWith('/usuarios/9');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      "id": 9,
      "nombre": "Rodrigo Fuentes",
      "email": "fuentes300hp@gmail.com",
      "tipo": "psicologo",
      "foto": "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
      "is_deleted": false,
      "createdAt": "2024-12-06T20:48:24.847Z"
    });

  });
});

describe("getTherapists", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deberia buscar todos los terapeutas", async () => {
    const mockApiResponse = {
      data: [
        {
          "id": 1,
          "usuario_id": 1,
          "url_calendly": "https://calendly.com/psicologo1",
          "especialidades": "Depresión, ansiedad, estrés",
          "experiencia": 5,
          "descripcion": "Psicólogo especializado en trastornos de ansiedad y depresión.",
          "ubicacion": "Valparaíso, Chile",
          "precio_min": 50000,
          "precio_max": 80000,
          "createdAt": "2024-11-11T02:58:26.429Z",
          "usuario": {
            "nombre": "Juan",
            "email": "juan@gmail.com",
            "foto": "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/49691987-a686-45ce-9195-6b86d43f8eac.png"
          }
        }
      ]
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getAllTherapist();

    expect(api.get).toHaveBeenCalledWith('/psicologos');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result).toEqual([
      {
        id: 1,
        usuario_id: 1,
        url_calendly: "https://calendly.com/psicologo1",
        especialidades: "Depresión, ansiedad, estrés",
        experiencia: 5,
        descripcion: "Psicólogo especializado en trastornos de ansiedad y depresión.",
        ubicacion: "Valparaíso, Chile",
        precio_min: 50000,
        precio_max: 80000,
        createdAt: "2024-11-11T02:58:26.429Z",
        nombre: "Juan",
        email: "juan@gmail.com",
        foto: "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/49691987-a686-45ce-9195-6b86d43f8eac.png",
        modalidad: "Presencial",
        metodo: "Orientación Psicoanalítica"
      }
    ]);

  });
  it("deberia entregar solo el terapueta que corresponda", async () =>{
    const mockApiResponse = {
      data: {
        "id": 5,
        "usuario_id": 9,
        "url_calendly": "https://calendly.com/?",
        "especialidades": "Psicoanálisis, Terapia familiar",
        "experiencia": 3,
        "descripcion": "Atiendo a domicilio",
        "ubicacion": "Temúco",
        "precio_min": 10000,
        "precio_max": 20000,
        "createdAt": "2024-12-07T15:07:09.981Z",
        "usuario": {
          "nombre": "Rodrigo Fuentes",
          "email": "fuentes300hp@gmail.com",
          "foto": "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
          "valoraciones_recibidas": [
            {
              "id": 9,
              "autor_id": 6,
              "evaluado_id": 9,
              "puntuacion": 4,
              "comentario": "Gran profesional, preocupado y realmente se maneja mucho en el tema de la Terapia Familiar.",
              "createdAt": "2024-12-07T18:08:07.755Z",
              "autor": {
                "nombre": "Sergio Gómez",
                "foto": "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/4cafae4f-012f-406e-abd6-153025d6d126.png"
              }
            }
          ]
        },
        "publicaciones": [
          {
            "id": 4,
            "contenido": "Probando esta funcionalidad",
            "createdAt": "2024-12-07T16:18:59.827Z"
          },
          {
            "id": 5,
            "contenido": "Recuerden siempre tomar descansos",
            "createdAt": "2024-12-07T16:42:14.694Z"
          },
          {
            "id": 6,
            "contenido": "No tengan miedo de buscar ayuda",
            "createdAt": "2024-12-07T16:49:46.761Z"
          },
          {
            "id": 7,
            "contenido": "Buenos Dias a Todos",
            "createdAt": "2024-12-08T16:26:12.097Z"
          }
        ]
      }
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getTherapistById('9');

    expect(api.get).toHaveBeenCalledWith('/psicologos/9');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      therapist: {
        id: 5,
        usuario_id: 9,
        url_calendly: "https://calendly.com/?",
        especialidades: "Psicoanálisis, Terapia familiar",
        experiencia: 3,
        descripcion: "Atiendo a domicilio",
        ubicacion: "Temúco",
        precio_min: 10000,
        precio_max: 20000,
        createdAt: "2024-12-07T15:07:09.981Z",
        nombre: "Rodrigo Fuentes",
        email: "fuentes300hp@gmail.com",
        foto: "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
        modalidad: "Presencial",
        metodo: "Orientación Psicoanalítica",
      },
      valoraciones_recibidas: [
        {
          id: 9,
          autor_id: 6,
          evaluado_id: 9,
          puntuacion: 4,
          comentario: "Gran profesional, preocupado y realmente se maneja mucho en el tema de la Terapia Familiar.",
          createdAt: "2024-12-07T18:08:07.755Z",
          autor_nombre: "Sergio Gómez",
          autor_foto: "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/4cafae4f-012f-406e-abd6-153025d6d126.png"
        }
      ],
      publicaciones: [
        {
          id: 4,
          contenido: "Probando esta funcionalidad",
          createdAt: "2024-12-07T16:18:59.827Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
          autorId: 9
        },
        {
          id: 5,
          contenido: "Recuerden siempre tomar descansos",
          createdAt: "2024-12-07T16:42:14.694Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
          autorId: 9
        },
        {
          id: 6,
          contenido: "No tengan miedo de buscar ayuda",
          createdAt: "2024-12-07T16:49:46.761Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
          autorId: 9
        },
        {
          id: 7,
          contenido: "Buenos Dias a Todos",
          createdAt: "2024-12-08T16:26:12.097Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "https://files.edgestore.dev/onv6ph4jhoz0micg/myPublicImages/_public/1528c8ba-6b8e-4835-81e2-9393271720e0.jpg",
          autorId: 9
        }
      ]
    });
  });
});