/// <reference types="cypress" />

describe(' Home page', () => {
  it('visit home page', () => {
    window.localStorage.setItem(
      'token',
      'eyJhbGciOiJSUzI1NiIsImtpZCI6Im5DdU15UWFTYmpSWmVmRWpmOFhpSHciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2Mzc0MDgyMDgsImV4cCI6MTYzNzQwODUwOCwiaXNzIjoiaHR0cDovLzE2Mi41NS45MC43OToxMDAwMCIsImF1ZCI6IlNhbWFuLk5vdGlmaWNhdGlvbi5BUEkiLCJjbGllbnRfaWQiOiJkOWQ0Yzg4Ny0xOWVjLTExZWMtYjY4Yy1hOGExNTkxNTJiODkiLCJzdWIiOiI3MjA5NmZkNC0zYmU5LTRmODktOGQwOS00ZDhhNzY4ZDRlOGQiLCJhdXRoX3RpbWUiOjE2MzcyMjc1MTgsImlkcCI6ImxvY2FsIiwibmFtZSI6InJlemFlaSIsImVtYWlsIjoiaGFtZWRyZXphZWkuZXpAZ21haWwuY29tIiwic2NvcGUiOlsicm9sZXMiLCJvcGVuaWQiLCJwcm9maWxlIiwiU2FtYW4uTm90aWZpY2F0aW9uLkFQSSJdLCJhbXIiOlsicHdkIl19.AeumVQAWo_0AFOTn4-DmNr12gmMsQ0srF0vDe5dweCXMs5Y5yoWowFBg_5J_kEoGLQ4fo3x8ytRzmRVNWwpy9pdCMUd-TlCIZxw_CsFCnPFx0E8y20L3gn29zqysZ-DooLRCM394Azi1ChHtbd9JPyNj5e9L62zf0F41v4ar0x88fH00ixukn-syijtLGLqIFMmqg2omhGv1ML_DrJ8bNUmU3mXJxr8zs4EAKBa2XAcKLPaUcLm3oZkwVZxpD_4rtZKljhrbCcjOBxnza2ebRKIczzRUp61IHKQb5hyUnojgC28XCfklz6_XSYB0cSg8Ufpbqo8HtLO-N3woTvJliw',
    );
    cy.visit('http://localhost:3000');
  });
});

export default {};
