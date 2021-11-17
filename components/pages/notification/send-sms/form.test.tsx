/**
 * @jest-environment jsdom
 */

import { render, cleanup, fireEvent, waitFor, act, logDOM } from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import SendSmsNotificationForm from './form';

const server = setupServer(
  rest.post('http://localhost:3000/api/notification/SendNotification', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ greeting: 'hello there' }));
  }),
);

describe('test notification send sms Form', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV, API_BASE_URL_NOTIFICATION_SERVICE: 'http://localhost:3000/' }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('success send sms', async () => {
    const listProviders = [
      {
        value: 1,
        key: 1,
      },
      {
        value: 2,
        key: 2,
      },
    ];
    const renderForm = render(<SendSmsNotificationForm providersList={listProviders} />);

    const selectInput = renderForm.getByLabelText('Default select example');
    fireEvent.change(selectInput, { target: { value: '1' } });

    const textInput = renderForm.getByPlaceholderText('form.phone.placeholder');
    fireEvent.change(textInput, { traget: { value: 'salam bar Iran' } });

    const textAreaInput = renderForm.getByPlaceholderText('form.body.placeholder');
    fireEvent.change(textAreaInput, { target: { value: 'salam bar Mohandes' } });

    const phoneInput = renderForm.getByPlaceholderText('form.phone.placeholder');
    fireEvent.change(phoneInput, { target: { value: '09038276860' } });

    await act(async () => {
      const button = await renderForm.getByText('form.submit');
      fireEvent.click(button);
    });

    await waitFor(async () => {
      expect(renderForm.getByText('form.success')).toBeInTheDocument();
    });
  });

  it('faild send Sms', async () => {
    const listProviders = [
      {
        value: 1,
        key: 1,
      },
      {
        value: 2,
        key: 2,
      },
    ];
    const renderForm = render(<SendSmsNotificationForm providersList={listProviders} />);

    const selectInput = renderForm.getByLabelText('Default select example');
    fireEvent.change(selectInput, { target: { value: '1' } });

    const textInput = renderForm.getByPlaceholderText('form.phone.placeholder');
    fireEvent.change(textInput, { traget: { value: 'salam bar Iran' } });

    const textAreaInput = renderForm.getByPlaceholderText('form.body.placeholder');
    fireEvent.change(textAreaInput, { target: { value: 'salam bar Mohandes' } });

    const phoneInput = renderForm.getByPlaceholderText('form.phone.placeholder');
    fireEvent.change(phoneInput, { target: { value: '09038276860' } });

    server.use(
      rest.post('http://localhost:3000/api/notification/SendNotification', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ greeting: 'hello there' }));
      }),
    );
    await act(async () => {
      const button = await renderForm.getByText('form.submit');
      fireEvent.click(button);
    });

    await waitFor(async () => {
      expect(renderForm.getByRole('alert')).toBeInTheDocument();
    });
  });
});

export default {};
