/**
 * 
 * @param {*} id 用户Id
 * @param {*} baseRoute 基础路由
 * @return 用户可见路由
 */
async function filtertlenu(id, baseRoute) {
  const params1 = { userId: id, code: '组织' }, params2 = { userId: id, code: '部门' };
  const { data: menu1 } = await guerMenu(params1)
  const { data: menu2 } = await queryMenu(params2);
  const permissonNenu = [...menu1, ...menu2]
  const routeList = deepClone(baseRoute.filter((item) => item._hidden !== 'true'))
  let newA = []
  routeList.map((item) => {
    permissonNenu.map(pitem => {
      if (pitem.appType == item._code) {
        newA.push(item)
      }
    })
  }
  )
  newA = Array.from(new Set(newA))
  return newA;
}
// 优化之后
async function filterMenu1(id, baseRoute) {
  const { data: menu1 } = await queryMenu2({ "userId": id, "code": "111" });
  const { data: menu2 } = await queryMenu2({ "userId": id, "code": "222" });
  const permissonMenu = [...menu1, ...menu2];
  return baseRoute.filter(item => {
    return item._hidden !== 'true' && permissonMenu.some(pItem => pItem.appType === item._code)
  })
}