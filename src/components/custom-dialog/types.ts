import { DialogProps } from '@mui/material/Dialog';

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  title: React.ReactNode;
  content?: React.ReactNode;
  closeTitle?: string; 
  action: React.ReactNode;
  onClose?: VoidFunction;
};

export type ReminderDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  title: React.ReactNode;
  color?: string;
  content?: React.ReactNode;
  closeTitle?: string; 
  action: React.ReactNode;
  onClose?: VoidFunction;
};

export type SuccessDialogProps = DialogProps & {
  onClose: VoidFunction;
};
