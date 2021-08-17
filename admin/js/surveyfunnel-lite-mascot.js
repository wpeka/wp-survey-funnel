
var srfvm = new Vue({
    el: '#srf-mascot-app',
    data: function() {
        return {
            showMenu: !1,
            isPro:mascot.is_pro
        }
    },
    computed: (
        {
            boxClass() {
                return {
                    'srf-mascot-quick-links srf-mascot-quick-links-open' : this.showMenu,
                    'srf-mascot-quick-links' : !this.showMenu,
                }
            },
            menuItems() {
                var mItems = [
                    {
                        icon: 'dashicons-lightbulb',
                        tooltip: mascot.menu_items.support_text,
                        link: mascot.menu_items.support_url,
                        key: 'support'
                    },
                    {
                        icon: 'dashicons-info',
                        tooltip: mascot.menu_items.faq_text,
                        link: mascot.menu_items.faq_url,
                        key: 'faq'
                    },
                    {
                        icon: 'dashicons-sos',
                        tooltip: mascot.menu_items.documentation_text,
                        link: mascot.menu_items.documentation_url,
                        key: 'documentation'
                    }
                ];
                if(!this.isPro) {
                    mItems.push({
                        icon: 'dashicons-star-filled',
                        tooltip: mascot.menu_items.upgrade_text,
                        link: mascot.menu_items.upgrade_url,
                        key: 'upgrade'
                    });
                }
                return mItems;
            }
        }
    ),
    methods:{
        buttonClick: function(){
            this.showMenu = !this.showMenu;
        },
        renderElements:function(createElement) {
            var html = [];
            if(this.showMenu) {
                this.menuItems.forEach((value, index) => {
                    html.push(createElement('a', {
                        key: value.key,
                        class: this.linkClass(value.key),
                        attrs: {
                            href: value.link,
                            'data-index': index,
                            target: '_blank'
                        }
                    }, [createElement('span', {
                        class: 'dashicons '+ value.icon
                    }), createElement('span', {
                        staticClass: 'srf-mascot-quick-link-title',
                        domProps: {
                            innerHTML: value.tooltip
                        }
                    })]));
                })
            }
            return html;
        },
        linkClass: function(key) {
            return 'srf-mascot-quick-links-menu-item srf-mascot-quick-links-item-' + key;
        },
        enter:function(t,e) {
            var n = 50 * t.dataset.index;
            setTimeout((function() {
                t.classList.add('srf-mascot-show'),
                    e()
            }), n)
        },
        leave:function(t,e) {
            t.classList.remove('srf-mascot-show'),
                setTimeout((function() {
                    e()
                }), 200)
        }
    },
    render(createElement){
        return createElement('div',{
            class: this.boxClass,
        }, [
            createElement('button', {
                class: 'srf-mascot-quick-links-label',
                on: {
                    click: this.buttonClick
                }
            },[
                createElement('span', {
                    class:'srf-mascot-bg-img srf-mascot-quick-links-mascot',
                }),
                createElement('span',{
                    class: 'srf-mascot-quick-link-title'
                }, mascot.quick_links_text)
            ]),
            createElement('transition-group', {
                staticClass: 'srf-mascot-quick-links-menu',
                attrs:{
                    tag: 'div',
                    name: 'srf-staggered-fade'
                },
                on: {
                    enter: this.enter,
                    leave: this.leave
                }
            }, this.renderElements(createElement))
        ]);
    },
});