import React from 'react';

export default function PokemonData({ data }) {
    return (
        <div className="p-4 m-2 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Información del Pokémon</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Propiedad</th>
            <th className="px-4 py-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Experiencia base</td>
            <td className="border px-4 py-2">{data.base_experience}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Altura</td>
            <td className="border px-4 py-2">{data.height}</td>
          </tr>
          {data.abilities.map((ability, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">Habilidad {index + 1}</td>
              <td className="border px-4 py-2">
                <p>Nombre: {ability.ability.name}</p>
                <p>URL: {ability.ability.url}</p>
                <p>Escondido: {ability.is_hidden ? 'Sí' : 'No'}</p>
                <p>Slot: {ability.slot}</p>
              </td>
            </tr>
          ))}
          {data.forms.map((form, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">Forma {index + 1}</td>
              <td className="border px-4 py-2">
                <p>Nombre: {form.name}</p>
                <p>URL: {form.url}</p>
              </td>
            </tr>
          ))}
          {data.held_items.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">Objeto sostenido {index + 1}</td>
              <td className="border px-4 py-2">
                <p>Nombre del objeto: {item.item.name}</p>
                <p>URL del objeto: {item.item.url}</p>
                <p>Detalles de la versión:</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};