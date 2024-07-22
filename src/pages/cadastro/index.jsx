import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";

import { Container, Title, Column, TitleLogin, SubtitleLogin, Row, Wrapper, CriarText } from './styles';

const Cadastro = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const response = await api.post('/users', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha
            });
            
            if (response.status === 201) {
                navigate('/login'); 
                return;
            }

            alert('Erro ao realizar o cadastro');
        } catch (e) {
            console.error("Houve um erro", e);
            alert('Ocorreu um erro ao tentar realizar o cadastro.');
        }
    };

    console.log('errors', errors);

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                    e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin>Comece agora Grátis</TitleLogin>
                        <SubtitleLogin>Crie sua conta e make the change._ </SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input 
                                placeholder="Nome Completo" 
                                leftIcon={<MdPerson />} 
                                name="nome" 
                                control={control} 
                                rules={{ required: 'Nome é obrigatório' }}
                            />
                            {errors.nome && <span>{errors.nome.message}</span>}
                            <Input 
                                placeholder="E-mail" 
                                leftIcon={<MdEmail />} 
                                name="email" 
                                control={control} 
                                rules={{ required: 'E-mail é obrigatório' }}
                            />
                            {errors.email && <span>{errors.email.message}</span>}
                            <Input 
                                type="password" 
                                placeholder="Password" 
                                leftIcon={<MdLock />}  
                                name="senha" 
                                control={control} 
                                rules={{ required: 'Senha é obrigatória' }}
                            />
                            {errors.senha && <span>{errors.senha.message}</span>}
                       
                        </form>
                        <Row >
                            <span> Ao clicar em "criar minha conta grátis", 
                                declaro que aceito as politicas de privacidade e os termos de uso da DIO.
                               
                                Já tenho conta  
                                 <CriarText>
                                     Fazer login
                                 </CriarText>
                                 
                            </span>
                            <Button 
                            title="Criar minha conta"
                            variant="secondary" 
                            type="submit"
                            
                            />
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
};

export { Cadastro };
