import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { InputStyled, InputRow } from './styles';
import EntityForm from '../_layouts/EntityForm';

import localeApi from '../../services/localeApi';
import api from '../../services/api';

function RecipientForm() {
  const history = useHistory();

  const [formData, setFormData] = useState({});

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(0);

  const [cities, setCities] = useState([]);

  const titleWord = history.location.pathname.includes('register')
    ? 'Cadastro'
    : 'Edição';

  function collectData(key, value) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSelectState(selected) {
    collectData('state', selected.label);
    setSelectedState(selected.value);
  }

  async function handleSave() {
    try {
      await api.post('/recipients', formData);
      alert('Destinatário criado com sucesso!');
      history.goBack();
    } catch (err) {
      alert('Algo deu errado!');
    }
  }

  useEffect(() => {
    async function getStates() {
      const response = await localeApi.get('', { params: { orderBy: 'nome' } });

      const statesList = response.data.map((state) => ({
        label: state.nome,
        value: state.id,
      }));

      setStates(statesList);
    }
    getStates();
  }, []);

  useEffect(() => {
    async function getCities() {
      const response = await localeApi.get(`/${selectedState}/municipios`);
      const citiesList = response.data.map((city) => ({
        label: city.nome,
        value: city.nome,
      }));
      setCities(citiesList);
    }
    getCities();
  }, [selectedState]);

  return (
    <EntityForm title={`${titleWord} de destinatários`} onSave={handleSave}>
      <InputStyled
        typeName="label"
        label="Nome"
        type="text"
        width={100}
        onChange={(e) => collectData('name', e.target.value)}
      />

      <InputRow>
        <InputStyled
          typeName="label"
          label="Rua"
          type="text"
          labelWidth={70}
          onChange={(e) => collectData('street', e.target.value)}
        />
        <InputStyled
          typeName="label"
          label="Número"
          type="number"
          labelWidth={15}
          onChange={(e) => collectData('number', e.target.value)}
        />

        <InputStyled
          typeName="label"
          label="Complemento"
          type="text"
          labelWidth={20}
          onChange={(e) => collectData('complement', e.target.value)}
        />
      </InputRow>

      <InputRow>
        <InputStyled
          typeName="labeled-select"
          label="Estado"
          type="text"
          labelWidth={33}
          onChange={handleSelectState}
          options={states}
        />
        <InputStyled
          typeName="labeled-select"
          label="Cidade"
          type="text"
          labelWidth={33}
          onChange={(e) => collectData('city', e.value)}
          options={cities}
        />

        <InputStyled
          typeName="label"
          label="CEP"
          type="number"
          labelWidth={33}
          onChange={(e) => collectData('zip', e.target.value)}
        />
      </InputRow>
    </EntityForm>
  );
}

export default RecipientForm;
