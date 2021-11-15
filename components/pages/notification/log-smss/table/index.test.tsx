/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LogsSmsTableNotification from './index';

const jsonData = {
  extendedProperties: null,
  items: [
    {
      requesterName: 'DorsaSysInternal',
      requesterFaName: 'DorsaSysInternal',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SMSSecurity',
      recipient: '09360761079',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nکد فعال سازی\n 47853411 \nبا تشکر\nدرگاه خدمات غیر حضوری شهرداری کرج',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-03T11:08:13.867+03:30',
      doneDate: '2021-11-03T11:08:14.223+03:30',
      lastDate: '2021-11-03T11:08:14.223+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/12 11:08:13',
      lastModifiedDateFa: '',
      id: 21610,
      guid: 'd2527f48-bd72-4153-837a-49114c5354cc',
      createDate: '2021-11-03T11:08:13.197+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
    {
      requesterName: 'DorsaSysInternal',
      requesterFaName: 'DorsaSysInternal',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SMSSecurity',
      recipient: '09360761079',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nاشتراک شما با موفقیت فعال شد.\nنام کاربری : 0920236472 \nرمز عبور : lIf0761079 \nبا تشکر\nدرگاه خدمات غیر حضوری شهرداری کرج',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-03T11:04:38.467+03:30',
      doneDate: '2021-11-03T11:04:38.743+03:30',
      lastDate: '2021-11-03T11:04:38.743+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/12 11:04:37',
      lastModifiedDateFa: '',
      id: 21609,
      guid: '73375447-0db0-4615-96bd-e6f436b3ced3',
      createDate: '2021-11-03T11:04:37.633+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
    {
      requesterName: 'DorsaSysInternal',
      requesterFaName: 'DorsaSysInternal',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SMSSecurity',
      recipient: '09360761079',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nکد فعال سازی\n 79043311 \nبا تشکر\nدرگاه خدمات غیر حضوری شهرداری کرج',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-03T11:04:13.87+03:30',
      doneDate: '2021-11-03T11:04:14.41+03:30',
      lastDate: '2021-11-03T11:04:14.41+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/12 11:04:12',
      lastModifiedDateFa: '',
      id: 21608,
      guid: '6244526c-6daf-4d06-801e-a111f0b01426',
      createDate: '2021-11-03T11:04:12.987+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
    {
      requesterName: 'DorsaSysInternal',
      requesterFaName: 'DorsaSysInternal',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SMSSecurity',
      recipient: '09155026882',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nاشتراک شما با موفقیت فعال شد.\nنام کاربری : 1292910860 \nرمز عبور : Ypv5026882 \nبا تشکر\nدرگاه خدمات غیر حضوری شهرداری کرج',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-03T09:08:03.257+03:30',
      doneDate: '2021-11-03T09:08:03.457+03:30',
      lastDate: '2021-11-03T09:08:03.457+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/12 09:08:02',
      lastModifiedDateFa: '',
      id: 21607,
      guid: '2c490865-e40f-40c1-ad18-266dfd80eb38',
      createDate: '2021-11-03T09:08:02.687+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
    {
      requesterName: 'DorsaSysInternal',
      requesterFaName: 'DorsaSysInternal',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SMSSecurity',
      recipient: '09155026882',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nکد فعال سازی\n 76591007 \nبا تشکر\nدرگاه خدمات غیر حضوری شهرداری کرج',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-03T09:07:40.497+03:30',
      doneDate: '2021-11-03T09:07:41.2+03:30',
      lastDate: '2021-11-03T09:07:41.2+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/12 09:07:40',
      lastModifiedDateFa: '',
      id: 21606,
      guid: '388a0814-f78c-4cd8-8246-4cdb5084a752',
      createDate: '2021-11-03T09:07:40.12+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
    {
      requesterName: 'DorsaSysInternal',
      requesterFaName: 'DorsaSysInternal',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SMSSecurity',
      recipient: '09155026882',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nاشتراک شما با موفقیت فعال شد.\nنام کاربری : 1292910860 \nرمز عبور : Qpz5026882 \nبا تشکر\nدرگاه خدمات غیر حضوری شهرداری کرج',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-03T08:13:45.417+03:30',
      doneDate: '2021-11-03T08:13:45.653+03:30',
      lastDate: '2021-11-03T08:13:45.653+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/12 08:13:45',
      lastModifiedDateFa: '',
      id: 21605,
      guid: '35a69e82-4148-4021-a9e3-d3a687b58af2',
      createDate: '2021-11-03T08:13:45.35+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
    {
      requesterName: 'DorsaSysInternal',
      requesterFaName: 'DorsaSysInternal',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SMSSecurity',
      recipient: '09155026882',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nکد فعال سازی\n 29065281 \nبا تشکر\nدرگاه خدمات غیر حضوری شهرداری کرج',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-03T08:13:27.67+03:30',
      doneDate: '2021-11-03T08:13:28.363+03:30',
      lastDate: '2021-11-03T08:13:28.363+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/12 08:13:27',
      lastModifiedDateFa: '',
      id: 21604,
      guid: '48178d29-c140-4924-a655-6583c0f4dd80',
      createDate: '2021-11-03T08:13:27.247+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
    {
      requesterName: 'Hamedrezaei',
      requesterFaName: 'Hamedrezaei',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SMSSecurity',
      recipient: '09155026882',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nکد فعال سازی\n 10299840 \nبا تشکر\nدرگاه خدمات غیر حضوری شهرداری کرج',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-02T19:21:30.81+03:30',
      doneDate: '2021-11-02T19:21:30.977+03:30',
      lastDate: '2021-11-02T19:21:30.977+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/11 19:21:30',
      lastModifiedDateFa: '',
      id: 21603,
      guid: '87db377f-2779-450a-9743-78807e68da1d',
      createDate: '2021-11-02T19:21:30.42+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
    {
      requesterName: 'Hamedrezaei',
      requesterFaName: 'Hamedrezaei',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SMSSecurity',
      recipient: '09155026882',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nکد فعال سازی\n 04328100 \nبا تشکر\nدرگاه خدمات غیر حضوری شهرداری کرج',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-02T19:20:30.137+03:30',
      doneDate: '2021-11-02T19:20:30.767+03:30',
      lastDate: '2021-11-02T19:20:30.767+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/11 19:20:29',
      lastModifiedDateFa: '',
      id: 21602,
      guid: '72dd5016-7b60-48cc-a271-29633ebae152',
      createDate: '2021-11-02T19:20:29.41+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
    {
      requesterName: 'SAMANSysInternal',
      requesterFaName: 'SAMANSysInternal',
      authorizedSystemGuid: 'c7b11d53-e394-4515-91c0-23a2ec3a3210',
      authorizedSystemName: 'Saman',
      notificationType: 'SecurityForgetpassword',
      recipient: '09155026882',
      emailCC: null,
      emailBCC: null,
      emailSubject: null,
      periority: null,
      messageCustomHeader: null,
      body: 'با سلام\nکد فعال سازی\n 47870282 \nبا تشکر\n',
      status: 'Done',
      serviceMessageId: 'ارسال با موفقیت انجام گردید',
      objectName: null,
      objectValue: null,
      lastStatus: 'Done',
      providerName: 'SmsIr',
      sendDate: '2021-11-02T10:11:28.517+03:30',
      doneDate: '2021-11-02T10:11:28.797+03:30',
      lastDate: '2021-11-02T10:11:28.797+03:30',
      codeResult: null,
      activeSMSProvider: null,
      memberDescription: null,
      isUpdated: false,
      isDeleted: false,
      ignoreBranch: false,
      createDateFa: '1400/08/11 10:11:27',
      lastModifiedDateFa: '',
      id: 21601,
      guid: 'a2fd19a6-9c92-4a03-985e-fa69d2fb29d6',
      createDate: '2021-11-02T10:11:27.537+03:30',
      createUserGuid: 'f1b567ed-7588-4dc9-98cd-7fe3d75c5093',
      createUserName: 'root',
      createPersonFullName: 'root',
      lastModifiedUserGuid: null,
      lastModifiedUserName: null,
      lastModifiedPersonFullName: null,
      lastModifiedDate: null,
      isDisabled: false,
      comment: null,
    },
  ],
  total: 12710,
  permissions: { addmessage: false, editmessage: false, deletemessage: false, messagesList: false },
  pagination: { pageNumber: 1, pageSize: 10 },
};

describe('Test log smss norification', () => {
  it('test to get success load data', async () => {
    const { debug, getByTestId } = render(<LogsSmsTableNotification data={jsonData} />);
    const mainElement = getByTestId('custom-element', { exact: true });
    expect(mainElement).toBeInTheDocument();

    const button = getByTestId('button_21602');
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText('table.logDetailModal.title')).toBeInTheDocument();
    });

    debug();
  });
});