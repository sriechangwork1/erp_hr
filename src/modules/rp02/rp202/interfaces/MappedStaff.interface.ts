import { Staff } from './StaffSource.interface';
import { UOCStaff } from './UOCStaff.interface';

export interface MappedStaff {
  id: string; // Unique ID for the mapping itself
  sourceStaff: Staff;
  sourceName?: string;
  uocStaff: UOCStaff;
  uocName?: string;
  mappedDate: string;
  mappedBy: string;
}