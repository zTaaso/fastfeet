import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

import { InputStyled, InputRow } from './styles';
import EntityForm from '../_layouts/EntityForm';

import localeApi from '../../services/localeApi';
import api from '../../services/api';

function RecipientForm({ match }) {
  const history = useHistory();
  const recipientId = match.params.id;

  const [formData, setFormData] = useState({});

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(0);

  const [selectedCity, setSelectedCity] = useState(0);

  const [cities, setCities] = useState([]);

  const status = history.location.pathname.includes('register')
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
    setSelectedState(selected);
  }

  function handleSelectCity(selected) {
    collectData('city', selected.label);
    setSelectedCity(selected);
  }

  async function handleSave() {
    try {
      if (status === 'Cadastro') {
        await api.post('/recipients', formData);
      } else {
        await api.put(`/recipients/${recipientId}`, {
          ...formData,
          city: selectedCity.value,
        });
      }
      toast.success('Destinatário salvo com sucesso!');
      history.goBack();
    } catch (err) {
      toast.error('Algo deu errado!');
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
      const response = await localeApi.get(
        `/${selectedState.value}/municipios`
      );
      const citiesList = response.data.map((city) => ({
        label: city.nome,
        value: city.nome,
      }));
      setCities(citiesList);
      setSelectedCity('');
    }
    getCities();
  }, [selectedState]);

  useEffect(() => {
    async function getRecipient(id) {
      const response = await api.get(`recipients/${id}`);
      setFormData(response.data);
      setSelectedCity({ label: response.data.city, value: response.data.city });
      setSelectedState({ label: response.data.state, value: '' });
    }

    if (status === 'Edição') {
      getRecipient(recipientId);
    }
  }, []);

  return (
    <EntityForm title={`${status} de destinatários`} onSave={handleSave}>
      <InputStyled
        typeName="label"
        label="Nome"
        type="text"
        width={100}
        value={formData.name}
        onChange={(e) => collectData('name', e.target.value)}
      />

      <InputRow>
        <InputStyled
          typeName="label"
          label="Rua"
          type="text"
          labelWidth={70}
          value={formData.street}
          onChange={(e) => collectData('street', e.target.value)}
        />
        <InputStyled
          typeName="label"
          label="Número"
          type="number"
          labelWidth={15}
          value={formData.number}
          onChange={(e) => collectData('number', e.target.value)}
        />

        <InputStyled
          typeName="label"
          label="Complemento"
          type="text"
          labelWidth={20}
          value={formData.complement}
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
          value={selectedState}
          options={states}
        />
        <InputStyled
          typeName="labeled-select"
          label="Cidade"
          type="text"
          labelWidth={33}
          value={selectedCity}
          onChange={handleSelectCity}
          options={cities}
        />

        <InputStyled
          typeName="label"
          label="CEP"
          type="number"
          labelWidth={33}
          value={formData.zip}
          onChange={(e) => collectData('zip', e.target.value)}
        />
      </InputRow>
    </EntityForm>
  );
}

export default RecipientForm;
