import { action,observable } from 'mobx';
import { Observer } from 'mobx-react';
import { FC } from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';
import { formatDate } from 'web-utility';

import { i18n } from '../models/Translation';

const { t } = i18n;

export interface DateTimeInputProps {
  id?: string;
  label: string;
  name: string;
  required?: boolean;
  startAt?: string;
  endAt?: string;
}

class FormState {
  @observable startAt = '';
  @observable endAt = '';
  @observable errorMessage = '';

  constructor(startAt: string = '', endAt: string = '') {
    this.startAt = startAt;
    this.endAt = endAt;
  }

  @action isValid() {
    const start = new Date(this.startAt).getTime();
    const end = new Date(this.endAt).getTime();

    if (!start || !end || start <= end) {
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Start time cannot be after end time';
    }
  }
}

export const DateTimeInput: FC<DateTimeInputProps> = ({
  id,
  label,
  name,
  required,
  startAt,
  endAt,
}) => {
  const formState = new FormState(startAt, endAt);

  const handleStartAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formState.startAt = event.target.value;
    console.log(formState.startAt, formState.endAt);
    formState.isValid();
    console.log(formState.errorMessage);
  };

  const handleEndAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formState.endAt = event.target.value;
    console.log(formState.startAt, formState.endAt);
    formState.isValid();
    console.log(formState.errorMessage);
  };

  return (
    <Form.Group as={Row} className="mb-3" controlId={id}>
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <InputGroup className="mb-3">
          <InputGroup.Text>{t('time_range')}</InputGroup.Text>
          <Form.Control
            name={`${name}StartedAt`}
            type="datetime-local"
            required={required}
            defaultValue={startAt && formatDate(startAt, 'YYYY-MM-DDTHH:mm:ss')}
            onChange={handleStartAtChange}
            isInvalid={!!formState.errorMessage}
          />
          <Form.Control
            name={`${name}EndedAt`}
            type="datetime-local"
            required={required}
            defaultValue={endAt && formatDate(endAt, 'YYYY-MM-DDTHH:mm:ss')}
            onChange={handleEndAtChange}
            isInvalid={!!formState.errorMessage}
          />

          <Form.Control.Feedback type="invalid">
            {formState.errorMessage}
          </Form.Control.Feedback>
        </InputGroup>
      </Col>
    </Form.Group>
  );
};
