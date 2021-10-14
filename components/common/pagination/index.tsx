import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

import Form from 'components/common/form';
import NumberInput from 'components/common/form/number-input';
import { CButton } from '@coreui/react-pro';
import { paginationType } from 'types/pagination';

export interface PaginationProps {
  pagination: paginationType;
  handleChangePage: Function;
}
const Pagination: React.FC<PaginationProps> = ({ pagination, handleChangePage }) => {
  const { t } = useTranslation('common');

  const handleSubmitForm = async (data: any) => {
    handleChangePage({ ...data, page: Number(data.page) });
  };

  const goToNextPage = () => {
    handleChangePage({ page: pagination.pageNumber + 1 });
  };

  const goToPreviousPage = () => {
    handleChangePage({ page: pagination.pageNumber - 1 });
  };

  const InputNumberPage = () => {
    useEffect(() => {
      setValue('page', pagination.pageNumber);
    }, [pagination]);
    const { setValue } = useFormContext();
    return (
      <div style={{ minWidth: '100px' }}>
        <NumberInput
          name='page'
          showLabel={false}
          min={1}
          max={pagination.totalPages}
          defaultValue={pagination.pageNumber}
        />
      </div>
    );
  };
  return (
    <Form onSubmit={handleSubmitForm}>
      <div className='d-flex align-items-center justify-content-center mb-4 gap-4'>
        <div className='d-flex gap-2'>
          <CButton
            className='ms-1'
            color='primary'
            variant='outline'
            onClick={goToPreviousPage}
            disabled={pagination.pageNumber === 1}
          >
            {t('pagination.previous')}
          </CButton>

          <InputNumberPage />

          <CButton type='submit' color='primary' variant='outline'>
            {t('pagination.submit')}
          </CButton>

          <CButton
            className='me-1'
            color='primary'
            variant='outline'
            onClick={goToNextPage}
            disabled={pagination.pageNumber === pagination.totalPages}
          >
            {t('pagination.next')}
          </CButton>
        </div>

        <strong className='me-4'>
          {t('pagination.content', { current: pagination.pageNumber, total: pagination.totalPages })}
        </strong>
      </div>
    </Form>
  );
};

export default Pagination;
