// components/Filters.tsx
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

const filters = [
  {
    id: 'especialidad',
    name: 'Áreas de especialidad',
    options: [
      { value: 'ansiedad', label: 'Ansiedad', checked: false },
      { value: 'apego', label: 'Apego', checked: false },
      { value: 'depresion', label: 'Depresión', checked: true },
      { value: 'ira', label: 'Manejor de la ira', checked: false },
      { value: 'fobias', label: 'Fobias', checked: false },
      { value: 'relacionestoxicas', label: 'Relaciones tóxicas', checked: false },
    ],
  },
  {
    id: 'experiencia',
    name: 'Años de experiencia',
    options: [
      { value: '10', label: '10 Años', checked: false },
      { value: '5', label: '5 Años', checked: false },
      { value: '2', label: '3 Años', checked: false },
      { value: '1', label: '1 Año', checked: false },
    ],
  },
]

interface Filters {
  esp: string;
  exp: number;
  city: string;
  min_price: number;
  max_price: number;
}

interface FiltersProps {
  onFiltersChange: (newFilters: Partial<{ esp: string; exp: number }>) => void;
}

export default function Filters() {
  
  const handleEspChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ esp: event.target.value });
  };

  const handleExpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ exp: Number(event.target.value) });
  };

  return (
    <form className="hidden lg:block">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section) => (
        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">{section.name}</span>
              <span className="ml-6 flex items-center">
                <PlusIcon aria-hidden="true" className="h-5 w-5 group-open:hidden" />
                <MinusIcon aria-hidden="true" className="h-5 w-5 hidden group-open:block" />
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`filter-${section.id}-${optionIdx}`}
                    name={`${section.id}[]`}
                    defaultValue={option.value}
                    defaultChecked={option.checked}
                    onChange={section.id === 'especialidad'? handleEspChange : handleExpChange}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </Disclosure>
      ))}
    </form>
  )
}
function onFiltersChange(arg0: { esp: string; }) {
  throw new Error('Function not implemented.');
}

