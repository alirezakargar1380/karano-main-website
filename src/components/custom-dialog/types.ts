import { DialogProps } from '@mui/material/Dialog';

// ----------------------------------------------------------------------

export type ConfirmDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  onClose: VoidFunction;
};

export type ReminderDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  title: React.ReactNode;
  color?: string;
  content?: React.ReactNode;
  action: React.ReactNode;
  onClose: VoidFunction;
};

export type SuccessDialogProps = Omit<DialogProps, 'title' | 'content'> & {
  onClose: VoidFunction;
  text: string
};
