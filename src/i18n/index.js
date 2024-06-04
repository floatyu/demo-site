import {createI18n} from 'vue-i18n'
import localeZhcn  from './language/zh-cn'
import localeEn from './language/en'
const i18n=createI18n({
    locale:'zh-cn', //默认语言
    fallbackLocale:'zh-cn',
    messages:{          //语言版本
        'zh-cn':localeZhcn,
        'en':localeEn,

    }

})
export default i18n