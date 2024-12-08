import '@testing-library/jest-dom';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import axios from 'axios';
import { api, getPosts } from "@/services/apiService";

const API_URL = "https://backend-sanamente-d7ej.onrender.com";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getPosts", () => {

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

    server.use(
        http.get(`${API_URL}/data`, (params) => {
          return res(ctx.json(mockApiResponse));
        })
      );

    const result = await getPosts();

    expect(result).toEqual([
        {
          contenido: "No tengan miedo de buscar ayuda",
          createdAt: "2024-12-07T16:49:46.761Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "/images/default-profile.png",
          autorId: 9,
        },
        {
          contenido: "Recuerden siempre tomar descansos",
          createdAt: "2024-12-07T16:42:14.694Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "/images/default-profile.png",
          autorId: 9,
        },
        {
          contenido: "Probando esta funcionalidad",
          createdAt: "2024-12-07T16:18:59.827Z",
          nombre: "Rodrigo Fuentes",
          imageUrl: "/images/default-profile.png",
          autorId: 9,
        },
    ]);

  });
});