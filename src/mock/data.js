import {User} from "@element-plus/icons-vue" 
import {Avatar} from "@element-plus/icons-vue" 
import {Management} from "@element-plus/icons-vue" 
import {Document} from "@element-plus/icons-vue" 
import {Operation} from "@element-plus/icons-vue" 
import {Tickets} from "@element-plus/icons-vue" 
import {Setting} from "@element-plus/icons-vue" 
import {OfficeBuilding} from "@element-plus/icons-vue" 
import{Menu} from "@element-plus/icons-vue" 
import{UserFilled} from "@element-plus/icons-vue" 
import{ChatDotRound} from "@element-plus/icons-vue" 
export const users=[
    {
        name:'admin',
        password:'123456',
        roleId:'admin'
    },
    {
        name:'visitor',
        password:'123456',
        roleId:'visitor'
    },
    {
        name:'master',
        roleId:'master',
        password:'123456'
    }
]
export const menuTreeData= [
            {   
                id:1,
                parentId:0,
                name: 'APP',
                path: '/app',
                icon: Menu,
                children: [
                    {  
                        id:11,
                        parentId:1,
                        name: 'AppUser',
                        path: '/app/user',
                        icon: User,
                    },
                    {   
                        id:12,
                         parentId:1,
                        name: 'AppDept',
                        path: '/app/dept',
                        icon: OfficeBuilding,
                    },
                    {  
                        id:13,
                         parentId:1,
                        name: 'AppRole',
                        path: '/app/role',
                        icon: Avatar,
                    },
                    {
                        id:14,
                         parentId:1,
                        name: 'AppResource',
                        path: '/app/resource',
                        icon: Management,
                    },
                ]
            },
            {   
                id:2,
                 parentId:0,
                name: 'sys',
                path: '/sys',
                icon: Setting,
                children: [
                    {   
                        id:21,
                         parentId:2,
                        name: 'sysUser',
                        path: '/sys/user',
                        icon: UserFilled,
                    },
                    {
                        id:22,
                        parentId:2,
                        name: 'sysNotice',
                        path: '/sys/notice',
                        icon: ChatDotRound,
                    },
                ]
            },
            {
                id:3,
                parentId:0,
                name: 'logs',
                path: '/logs',
                icon: Document,
                children: [
                    {
                        id:31,
                        parentId:3,
                        name: 'logsVisit',
                        path: '/logs/visit',
                        icon: Tickets,
                    },
                    {
                        id:32,
                        name: 'logsOperation',
                        path: '/logs/operation',
                        icon: Operation,
                    },
                ]
            },
        ]
    

       
