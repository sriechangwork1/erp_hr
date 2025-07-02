import { Staff } from './StaffSource.interface';
import { UOCStaff } from './UOCStaff.interface';

export interface MappedStaff {
  id: string; // Unique ID for the mapping itself
  sourceStaff: Staff;
  uocStaff: UOCStaff;
  mappedDate: string;
  mappedBy: string;
}