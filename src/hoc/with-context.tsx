const withContext = (WappedComponent: any, ContextProvider: any) => (props: any) =>
  (
    <ContextProvider>
      <WappedComponent {...props} />
    </ContextProvider>
  );

export default withContext;
