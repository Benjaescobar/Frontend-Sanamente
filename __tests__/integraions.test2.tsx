import '@testing-library/jest-dom';
import { api, getSessionsByPacientId, getSessionsByPacientIdAndPsychologistId, getSessionsByPsychologistId, getTimeSlotsUsed } from "@/services/apiService";

jest.spyOn(api, 'get').mockImplementation(jest.fn());

describe("getSessionsByPacientId", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deberia obtener todas las sesiones de un paciente", async () => {
    const mockApiResponse = {
      data: [
          {
            "id": 13,
            "paciente_id": 12,
            "psicologo_id": 1,
            "estado": "2024-12-12 10:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T23:19:15.409Z"
          },
          {
            "id": 12,
            "paciente_id": 12,
            "psicologo_id": 6,
            "estado": "2024-12-13 12:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T22:38:32.864Z"
          },
          {
            "id": 11,
            "paciente_id": 12,
            "psicologo_id": 6,
            "estado": "2024-12-06 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T22:37:21.957Z"
          },
          {
            "id": 10,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-04 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T22:43:41.948Z"
          },
          {
            "id": 9,
            "paciente_id": 6,
            "psicologo_id": 9,
            "estado": "2024-12-06 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T18:07:15.751Z"
          },
          {
            "id": 8,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-11 11:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:40:33.677Z"
          },
          {
            "id": 7,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-09 14:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:40:16.200Z"
          },
          {
            "id": 6,
            "paciente_id": 11,
            "psicologo_id": 2,
            "estado": "2024-12-09 11:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:07:21.652Z"
          },
          {
            "id": 5,
            "paciente_id": 9,
            "psicologo_id": 5,
            "estado": "2024-12-06 17:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T14:50:19.997Z"
          },
          {
            "id": 4,
            "paciente_id": 6,
            "psicologo_id": 2,
            "estado": "2024-12-12 15:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-06T00:52:52.441Z"
          },
          {
            "id": 3,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-04 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T23:08:56.784Z"
          },
          {
            "id": 2,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-06 17:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T22:36:05.153Z"
          },
          {
            "id": 1,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-06 14:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T22:33:51.763Z"
          }
        ]      
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getSessionsByPacientId(12);

    expect(api.get).toHaveBeenCalledWith('/sesiones/');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result).toContainEqual({
    "id": 13,
    "paciente_id": 12,
    "psicologo_id": 1,
    "estado": "2024-12-12 10:00:00",
    "tipo": "presencial",
    "createdAt": "2024-12-08T23:19:15.409Z"
    })

  });
});

describe("getSessionsByPacientIdAndPsychologistId", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deberia obtener todas las sesiones de un paciente con un psicologo", async () => {
    const mockApiResponse = {
      data: [
          {
            "id": 13,
            "paciente_id": 12,
            "psicologo_id": 1,
            "estado": "2024-12-12 10:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T23:19:15.409Z"
          },
          {
            "id": 12,
            "paciente_id": 12,
            "psicologo_id": 6,
            "estado": "2024-12-13 12:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T22:38:32.864Z"
          },
          {
            "id": 11,
            "paciente_id": 12,
            "psicologo_id": 6,
            "estado": "2024-12-06 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T22:37:21.957Z"
          },
          {
            "id": 10,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-04 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T22:43:41.948Z"
          },
          {
            "id": 9,
            "paciente_id": 6,
            "psicologo_id": 9,
            "estado": "2024-12-06 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T18:07:15.751Z"
          },
          {
            "id": 8,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-11 11:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:40:33.677Z"
          },
          {
            "id": 7,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-09 14:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:40:16.200Z"
          },
          {
            "id": 6,
            "paciente_id": 11,
            "psicologo_id": 2,
            "estado": "2024-12-09 11:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:07:21.652Z"
          },
          {
            "id": 5,
            "paciente_id": 9,
            "psicologo_id": 5,
            "estado": "2024-12-06 17:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T14:50:19.997Z"
          },
          {
            "id": 4,
            "paciente_id": 6,
            "psicologo_id": 2,
            "estado": "2024-12-12 15:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-06T00:52:52.441Z"
          },
          {
            "id": 3,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-04 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T23:08:56.784Z"
          },
          {
            "id": 2,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-06 17:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T22:36:05.153Z"
          },
          {
            "id": 1,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-06 14:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T22:33:51.763Z"
          }
        ]      
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getSessionsByPacientIdAndPsychologistId(12, 6);

    expect(api.get).toHaveBeenCalledWith('/sesiones/');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result).toContainEqual({
      "id": 12,
      "paciente_id": 12,
      "psicologo_id": 6,
      "estado": "2024-12-13 12:00:00",
      "tipo": "presencial",
      "createdAt": "2024-12-08T22:38:32.864Z"
    });

    expect(result).toContainEqual({
      "id": 11,
      "paciente_id": 12,
      "psicologo_id": 6,
      "estado": "2024-12-06 09:00:00",
      "tipo": "presencial",
      "createdAt": "2024-12-08T22:37:21.957Z"
    });
  })
})


describe("getSessionsByPsychologistId", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deberia obtener todas las sesiones de un psicologo", async () => {
    const mockApiResponse = {
      data: [
          {
            "id": 13,
            "paciente_id": 12,
            "psicologo_id": 1,
            "estado": "2024-12-12 10:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T23:19:15.409Z"
          },
          {
            "id": 12,
            "paciente_id": 12,
            "psicologo_id": 6,
            "estado": "2024-12-13 12:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T22:38:32.864Z"
          },
          {
            "id": 11,
            "paciente_id": 12,
            "psicologo_id": 6,
            "estado": "2024-12-06 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T22:37:21.957Z"
          },
          {
            "id": 10,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-04 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T22:43:41.948Z"
          },
          {
            "id": 9,
            "paciente_id": 6,
            "psicologo_id": 9,
            "estado": "2024-12-06 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T18:07:15.751Z"
          },
          {
            "id": 8,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-11 11:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:40:33.677Z"
          },
          {
            "id": 7,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-09 14:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:40:16.200Z"
          },
          {
            "id": 6,
            "paciente_id": 11,
            "psicologo_id": 2,
            "estado": "2024-12-09 11:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:07:21.652Z"
          },
          {
            "id": 5,
            "paciente_id": 9,
            "psicologo_id": 5,
            "estado": "2024-12-06 17:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T14:50:19.997Z"
          },
          {
            "id": 4,
            "paciente_id": 6,
            "psicologo_id": 2,
            "estado": "2024-12-12 15:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-06T00:52:52.441Z"
          },
          {
            "id": 3,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-04 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T23:08:56.784Z"
          },
          {
            "id": 2,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-06 17:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T22:36:05.153Z"
          },
          {
            "id": 1,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-06 14:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T22:33:51.763Z"
          }
        ]      
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getSessionsByPsychologistId(7);

    expect(api.get).toHaveBeenCalledWith('/sesiones/');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result).toContainEqual({
      "id": 10,
      "paciente_id": 11,
      "psicologo_id": 7,
      "estado": "2024-12-04 09:00:00",
      "tipo": "presencial",
      "createdAt": "2024-12-07T22:43:41.948Z"
    })
    expect(result).toContainEqual({
      "id": 8,
      "paciente_id": 11,
      "psicologo_id": 7,
      "estado": "2024-12-11 11:00:00",
      "tipo": "presencial",
      "createdAt": "2024-12-07T15:40:33.677Z"
    })
  });
});


describe("getTimeSlotsUsed", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deberia obtener todas las sesiones de un paciente", async () => {
    const mockApiResponse = {
      data: [
          {
            "id": 13,
            "paciente_id": 12,
            "psicologo_id": 1,
            "estado": "2024-12-12 10:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T23:19:15.409Z"
          },
          {
            "id": 12,
            "paciente_id": 12,
            "psicologo_id": 6,
            "estado": "2024-12-13 12:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T22:38:32.864Z"
          },
          {
            "id": 11,
            "paciente_id": 12,
            "psicologo_id": 6,
            "estado": "2024-12-06 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-08T22:37:21.957Z"
          },
          {
            "id": 10,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-04 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T22:43:41.948Z"
          },
          {
            "id": 9,
            "paciente_id": 6,
            "psicologo_id": 9,
            "estado": "2024-12-06 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T18:07:15.751Z"
          },
          {
            "id": 8,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-11 11:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:40:33.677Z"
          },
          {
            "id": 7,
            "paciente_id": 11,
            "psicologo_id": 7,
            "estado": "2024-12-09 14:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:40:16.200Z"
          },
          {
            "id": 6,
            "paciente_id": 11,
            "psicologo_id": 2,
            "estado": "2024-12-09 11:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T15:07:21.652Z"
          },
          {
            "id": 5,
            "paciente_id": 9,
            "psicologo_id": 5,
            "estado": "2024-12-06 17:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-07T14:50:19.997Z"
          },
          {
            "id": 4,
            "paciente_id": 6,
            "psicologo_id": 2,
            "estado": "2024-12-12 15:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-06T00:52:52.441Z"
          },
          {
            "id": 3,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-04 09:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T23:08:56.784Z"
          },
          {
            "id": 2,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-06 17:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T22:36:05.153Z"
          },
          {
            "id": 1,
            "paciente_id": 6,
            "psicologo_id": 1,
            "estado": "2024-12-06 14:00:00",
            "tipo": "presencial",
            "createdAt": "2024-12-05T22:33:51.763Z"
          }
        ]      
    };

    (api.get as jest.Mock).mockResolvedValue(mockApiResponse);

    const result = await getSessionsByPacientId(12);

    expect(api.get).toHaveBeenCalledWith('/sesiones/');
    expect(api.get).toHaveBeenCalledTimes(1);

    expect(result.length).toBeGreaterThanOrEqual(3);
    expect(result).toContainEqual({
    "id": 13,
    "paciente_id": 12,
    "psicologo_id": 1,
    "estado": "2024-12-12 10:00:00",
    "tipo": "presencial",
    "createdAt": "2024-12-08T23:19:15.409Z"
    })

  });
});

