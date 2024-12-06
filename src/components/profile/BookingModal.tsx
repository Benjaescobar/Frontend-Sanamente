"use client";
import { createSession, getTimeSlotsUsed } from "@/services/apiService";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

type BookingModalProps = {
  isOpen: boolean;
  psicologoId: any;
  onClose: () => void;
  onSubmit: () => void;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
};

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  psicologoId,
  onClose,
  onSubmit,
  onDateSelect,
  onTimeSelect,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [usedHours, setUsedHours] = useState<string[]>([]);
  const [isWeekend, setIsWeekend] = useState<boolean>(false);

  // Fetch time slots when the date changes
  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (selectedDate && !isWeekend) {
        onDateSelect(selectedDate); // Notifica al componente padre

        try {
          const usedTimeSlots = await getTimeSlotsUsed(
            Number(psicologoId),
            dayjs(selectedDate).format("YYYY-MM-DD")
          );
          const hours = usedTimeSlots.map((slot: any) =>
            dayjs(slot.estado, "YYYY-MM-DD HH:mm:ss").format("HH:mm")
          );
          setUsedHours(hours); // Guarda las horas usadas
        } catch (error) {
          console.error("Error al obtener los horarios usados:", error);
          setUsedHours([]);
        }
      } else {
        setUsedHours([]); // Limpia los horarios si es fin de semana
      }
    };
    fetchTimeSlots();
  }, [selectedDate, isWeekend, onDateSelect]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = dayjs(e.target.value);
    setSelectedDate(date.format("YYYY-MM-DD")); // Actualiza el estado de la fecha seleccionada

    // Verifica si la fecha seleccionada es fin de semana
    const dayOfWeek = date.day(); // 0 = domingo, 6 = sábado
    setIsWeekend(dayOfWeek === 0 || dayOfWeek === 6);
  };

  const handleTimeSelect = (slot: string) => {
    if (!usedHours.includes(slot) && !isWeekend) {
      setSelectedTime(slot); // Actualiza el estado del horario seleccionado
      onTimeSelect(slot); // Notifica al componente padre
    }
  };

  if (!isOpen){
    return null;
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-lg max-w-3xl w-full flex relative">
        {/* Divisor izquierdo */}
        <div className="w-1/3 p-6 bg-gray-100 rounded-l-lg flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Información
            </h3>
            <p className="text-sm text-gray-600">
              Selecciona la fecha que más te acomode. Los horarios disponibles
              aparecerán automáticamente. Los módulos son de 1 hora. Los fines
              de semana no están disponibles.
            </p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="w-2/3 p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Agendar hora</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Fecha */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona la fecha
            </label>
            <input
              type="date"
              className="w-full border rounded-lg p-2"
              onChange={handleDateChange}
            />
          </div>

          {/* Horarios */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona el horario
            </label>
            {isWeekend ? (
              <p className="text-sm text-red-500">
                No se pueden agendar horarios los fines de semana.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSelect(slot)}
                    className={`border p-2 rounded-lg ${
                      usedHours.includes(slot)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "hover:bg-blue-100"
                    } ${
                      selectedTime === slot && !usedHours.includes(slot)
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                    disabled={usedHours.includes(slot)} // Desactiva el botón si está usado
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botón de confirmación */}
          <button
            onClick={onSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            disabled={!selectedDate || !selectedTime || isWeekend} // Deshabilita si es fin de semana
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
