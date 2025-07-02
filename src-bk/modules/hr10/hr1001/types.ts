// hr1001/types.ts
 // src/modules/hr/PermissionManagement/types.ts

export interface UserGroup {
  id: string;
  name: string;
}

export interface ReportPage {
  id: string;
  name: string;
}

// สำหรับเก็บสิทธิ์ที่ถูกกำหนด (อาจจะเก็บในฐานข้อมูลจริง)
export interface UserGroupPermission {
  groupId: string;
  reportPageIds: string[]; // Array of report page IDs that this group has access to
}