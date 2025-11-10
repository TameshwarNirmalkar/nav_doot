'use client';

import React, { memo } from 'react';
import PermissionTable from './PermissionTable';

export default memo(function PermissionWrapper() {
  return (
    <div>
      <h1>Permission</h1>
      <PermissionTable />
    </div>
  );
});
