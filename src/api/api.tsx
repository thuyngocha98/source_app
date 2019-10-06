
import axios from 'axios';
import { tokenJWT } from './tokenApiJWT';

const TIMEOUT = 100
export const BASEURL = 'http://demo.chocayxanh.vn'

axios.defaults.withCredentials = true

export default {
    //
    postOrder: async (order) => {
        try {
            let url = BASEURL + '/api/BE_Order/CreateOrderAsync';
            const response = await axios.post(url, {
                "firstName": order.firstName,
                "email": order.email,
                "address": order.address,
                "phone": order.phone,
                "districtGuid": order.districtGuid,
                "provinceGuid": order.provinceGuid,
                "ghi_chu_cua_khach_hang": order.ghi_chu_cua_khach_hang,
                "cartList": order.cartList
              });        
            return response.data.data;
        }
        catch (error) {
            console.log(error);
        }
    },

    getProducts: async (pageIndex = 1, pageSize = 8) => {
        try {
            let url = BASEURL + 'api/be_tree/gettreesasync';
            const response = await axios.get(url, { params: { pageIndex: pageIndex, pageSize: pageSize } });
            // handle success          
            //console.log(response);
            return response.data.data;
        }
        catch (error) {
            // handle error
            console.log(error);
        }
    },

    _getDataTreeForSearch: async () => {
        var array = [];
        var urls = [BASEURL+"/wp-json/wc/v3/products?per_page=100&page=1", BASEURL+"/wp-json/wc/v3/products?per_page=100&page=2", BASEURL+"/wp-json/wc/v3/products?per_page=100&page=3"]
        await Promise.all(
            urls.map(url =>
                fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokenJWT
                    }
                })
                    .then(res => res.json())
                    .then(res => res)
            )
        ).then(res => {
            array = [].concat(...res)       
        });
        return array;
    }
}