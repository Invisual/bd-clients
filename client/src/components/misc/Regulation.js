import React from 'react'
import {RegulationDiv} from '../../styles/misc'

export const Regulation = (props) => {

    const rules = [
        {
            number: 1,
            title: 'Horário de funcionamento',
            text: 'De 2ª a 6ª feira, das (9:00-13:00) e das (14:00-18:00). Tolerância de até 5 minutos e até 2 vezes por semana. Os restantes atrasos têm que ser compensados com tempo de trabalho.'
        },
        {
            number: 2,
            title: 'Marcar dias de Férias',
            text: 'Com o mínimo de 1 mês de antecedência e tem que ser aprovado pela Direção, não sendo, à partida, possível marcar em simultâneo com outros colegas. Casos excecionais serão discutidos com a Direção da Agência.'
        },
        {
            number: 3,
            title: 'Pedido de dias',
            text: 'Com 1 mês de antecedência e tem que ser aprovado pela Direção, não sendo, à partida possível marcar em simultâneo com outros colegas. Casos excecionais serão discutidos com a Direção da Agência.'
        },
        {
            number: 4,
            title: 'Pedidos de chegada com atraso ou saída antecipada',
            text: 'Enviar e-mail para Nuno, Bruna e Contabilidade. Estes atrasos serão compensados em horas de trabalho extra ou descontados em período de férias. A decidir pela Direção.'
        },
        {
            number: 5,
            title: 'Horas extra',
            text: 'Só com permissão da Direção da Agência e com a prévia definição da compensação correspondente.'
        },
        {
            number: 6,
            title: 'Intervalo de manhã',
            text: 'Das 11:00h às 11:15h. Se durante este período estiverem em reuniões, podem fazer o intervalo logo de seguida.'
        },
        {
            number: 7,
            title: 'Intervalo de tarde',
            text: 'Das 16:00h-16:15h. Se durante este período estiverem em reuniões, podem fazer o intervalo logo de seguida.'
        },
        {
            number: 8,
            title: 'Telemóvel',
            text: 'O uso de telemóvel pessoal só é possível se a pessoa se levantar e for obrigatoriamente para a zona de entrada. Se for para o exterior tem que marcar no relógio de ponto a saída e a entrada.'
        },
        {
            number: 9,
            title: 'Relógio de ponto',
            text: 'Marcar: \n- entrada da manhã  \n- intervalos da manhã  \n- saída para almoço  \n- entrada da tarde  \n- intervalos da tarde  \n- saída fim do dia  \n- todas as saídas e entradas, de caráter pessoal, ao exterior.'
        },
        {
            number: 10,
            title: 'Fumar',
            text: 'Fora dos intervalos da manhã ou da tarde, é de evitar ir mais do que um elemento em simultâneo (para tornar o ato mais rápido), e tem que ser registado no relógio de ponto a entrada e saída para ir fumar.'
        },
        {
            number: 11,
            title: 'Alimentação',
            text: 'É obrigatória na zona de entrada, sendo proibida nos postos de trabalho.'
        },
        {
            number: 12,
            title: 'Arrumação de mesas',
            text: 'Para uma fácil higienização e para uma imagem cuidada dos diferentes postos de trabalho, cada mesa tem uma ocupação máxima definida pelos equipamentos disponibilizados pela direção da Agência. O restante material deve ser guardado nos cacifos e nos locais comuns para os diferentes efeitos.'
        },
        {
            number: 13,
            title: 'Nota final',
            text: 'Este regulamento é sujeito a alterações que a direção da Agência considere pertinentes para o bom funcionamento do grupo de trabalho.'
        },
    ]

    return (
        <RegulationDiv className="regulation">
            <div className="content-title">
                <h2>Regulamento Interno</h2>
                <p>
                    O Regulamento Interno é um elemento criado para facilitar a organização dos recursos humanos da
                    Agência, de forma a melhorar a leitura organizacional e o cumprimento das regras que a direção da
                    empresa pretende ver implementadas.
                </p>
            </div>

            <div className="content-rules">

                {rules.map(rule => (
                    <div className="single-rule" key={rule.number}>
                        <h3 className="rule-title"><strong>{rule.number} - </strong>{rule.title}</h3>
                        <p>{rule.text}</p>
                    </div>
                ))}

            </div>
        </RegulationDiv>
    )
}