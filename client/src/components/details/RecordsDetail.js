import React from 'react'
import { RecordDetailsDiv } from '../../styles/listings'
import moment from 'moment'
import 'moment/locale/pt'

export const RecordsDetail = ({
  records,
  monthsList,
  activeMonth,
  isLoading
}) => {
  const month = monthsList.find(month => month.id === activeMonth)
  const monthName = month ? month.name : ''

  const generateTypeString = type => {
    switch (type) {
      case 'insert':
        return 'criou um novo cliente '
      case 'edit':
        return 'editou o nome do cliente '
      case 'edit-info':
        return 'editou as infos do cliente '
      case 'delete':
        return 'apagou o cliente '
      default:
        return 'fez alterações no cliente '
    }
  }

  return (
    <>
      {isLoading ? (
        <RecordDetailsDiv>
          <img
            src="/img/loading.svg"
            alt="loading"
            className="loading-spinner"
          />
        </RecordDetailsDiv>
      ) : (
        <RecordDetailsDiv>
          <div className="container">
            <h2>{monthName}</h2>

            <ul>
              {records.map(record => (
                <li key={record.id_record}>
                  <strong>
                    {moment(record.date_record).format('DD MMM - HH:mm')}
                  </strong>
                  <a
                    href={`/team/${record.user_record}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {record.name_user}
                  </a>{' '}
                  {generateTypeString(record.type_record)}
                  {record.client_record ? (
                    <a
                      href={`/clients/${record.client_record}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {record.client_name_record}
                    </a>
                  ) : (
                    <span>{record.client_name_record}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </RecordDetailsDiv>
      )}
    </>
  )
}
