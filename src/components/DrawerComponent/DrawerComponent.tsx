// import { Button, Drawer, Flex, Space } from 'antd';
// import React, { memo, useCallback, useState } from 'react';
// import { RiCloseLine } from 'react-icons/ri';

// export default memo(function DrawerComponent() {
//   const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

//   const onDrawerOpen = useCallback(() => {
//     setIsCollapsed(true);
//   }, []);

//   const onDrawerClose = useCallback(() => {
//     setIsCollapsed(false);
//   }, []);

//   return (
//     <Drawer
//       title={
//         <Flex justify="space-between">
//           {/* <span>{id ? 'Edit Location' : 'Add Location'}</span> */}
//           <span>Edit Branch</span>
//           <RiCloseLine size={20} onClick={onDrawerClose} className="cursor-pointer" />
//         </Flex>
//       }
//       open={isCollapsed}
//       closable={false}
//       maskClosable={false}
//       footer={
//         <Flex justify="end">
//           <Space>
//             <Button onClick={onDrawerClose} disabled={isLoading}>
//               Cancel
//             </Button>
//             <Button type="primary" onClick={onSave} disabled={isLoading} icon={isLoading ? <IconLoader showLoader={isLoading} iconSize={20} /> : null}>
//               Save
//             </Button>
//           </Space>
//         </Flex>
//       }>
//       {children}
//     </Drawer>
//   );
// });
