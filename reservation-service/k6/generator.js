//import { randomBytes } from "k6/crypto";

export function generate_inn(organization_type) {

    var inn = [];

    if (organization_type === "UL") {

        for (var i = 0; i < 9; i++) {

           inn.push(Math.floor(Math.random() * 10));

        }

        if ([90, 93, 94, 95, 96, 98].includes(inn[0] * 10 + inn[1])) {

            inn[0] = inn[0] - 1;

        }

        inn.push(((inn[0] * 2 + inn[1] * 4 + inn[2] * 10 + inn[3] * 3 + inn[4] * 5 +

                   inn[5] * 9 + inn[6] * 4 + inn[7] * 6 + inn[8] * 8) % 11) % 10);

        } else if (organization_type === "FL") {

            for (var i = 0; i < 10; i++) {

                inn.push(Math.floor(Math.random() * 10));

            }

            if ([90, 93, 94, 95, 96, 98].includes(inn[0] * 10 + inn[1])) {

                inn[0] = inn[0] - 1;

            }

            inn.push(((inn[0] * 7 + inn[1] * 2 + inn[2] * 4 + inn[3] * 10 + inn[4] * 3 +

                       inn[5] * 5 + inn[6] * 9 + inn[7] * 4 + inn[8] * 6 + inn[9] * 8) % 11) % 10);

            inn.push(((inn[0] * 3 + inn[1] * 7 + inn[2] * 2 + inn[3] * 4 + inn[4] * 10 +

                       inn[5] * 3 + inn[6] * 5 + inn[7] * 9 + inn[8] * 4 + inn[9] * 6 + inn[10] * 8) % 11) % 10);

        }

    //console.log(inn.join(''));          

    return inn.join('');

}

export function generate_ogrn(organization_type) {

    if (organization_type === 'UL') {

        var s1 = Math.floor(Math.random() * 2) + 1;

        var s2_3 = new Date().getFullYear().toString().slice(2);

        var s4_5 = 50;

        var s6_12 = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;

        var s1_12 = s1.toString() + s2_3 + s4_5 + s6_12.toString();

        var s13 = parseInt(s1_12) % 11;

        if (s13 === 10) {

            s13 = 0;

        }

        //console.log(s1_12.toString() + s13.toString());

        return s1_12.toString() + s13.toString();

    } else if (organization_type === 'FL') {

        var s1 = 3;

        var s2_3 = new Date().getFullYear().toString().slice(2);

        var s4_5 = 50;

        var s6_14 = Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;

        var s1_14 = s1.toString() + s2_3 + s4_5 + s6_14.toString();

        var s15 = parseInt(s1_14) % 13;

        if (s15 === 10) {

            s15 = 0;

        }

        //console.log(s1_14.toString() + s15.toString());

        return s1_14.toString() + s15.toString();

    } else {

        throw new Error(organization_type);

    }            

}

export function generate_kpp() {

    var s1_2 = [50, 77, 90, 99][Math.floor(Math.random() * 4)];

    var s3_4 = Math.floor(Math.random() * (99 - 10 + 1)) + 10;

    var s5_6 = Math.floor(Math.random() * (50 - 10 + 1)) + 10;

    var s7_9 = Math.floor(Math.random() * (999 - 100 + 1)) + 100;

    return '' + s1_2 + s3_4 + s5_6 + s7_9;

}

 

export function generate_okpo(organization_type) {

    var okpo = [];

    if (organization_type === 'UL') {

        okpo.push(Math.floor(Math.random() * 9) + 1);

        for (var i = 0; i < 6; i++) {

            okpo.push(Math.floor(Math.random() * 10));

        }

        okpo.push((okpo[0] * 1 + okpo[1] * 2 + okpo[2] * 3 + okpo[3] * 4 + okpo[4] * 5 +

            okpo[5] * 6 + okpo[6] * 7) % 11);

    } else if (organization_type === 'FL') {

        return '' + Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

    }

    return okpo.join('');

}

export function generate_snils() {


    return `------- не реализованно -------`;
}

export function generate_phone() {
    return '+7 9' + random_number(2) + ' ' + random_number(3) + '-' + random_number(2) + '-' + random_number(2);
}

export function random_characters(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLenght = characters.length;
    let counter = 0;
    while (counter < length) {
        result +=characters.charAt(Math.floor(Math.random() * charactersLenght));
        counter += 1;
    }
    return result;
}

export function random_letters(length) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLenght = characters.length;
    let counter = 0;
    while (counter < length) {
        result +=characters.charAt(Math.floor(Math.random() * charactersLenght));
        counter += 1;
    }
    return result;
}

export function random_number(length) {
    let result = '';
    const numbers = '0123456789';
    const numbersLength = numbers.length;
    let counter = 0;
    while (counter < length) {
        result +=numbers.charAt(Math.floor(Math.random() * numbersLength));
        counter += 1;
    }
    return result;
}

export function random_number_between(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export function current_date() {
    const date = new Date();
    const currentDate =date.toISOString().split('.')[0];
    return currentDate;
}

export function random_small_date() {
    var m = random_number_between(1,12);
    if (m < 10)
        var mes = '0' + m;
    else
        var mes = m;
    if (m = 2)    
        var d = random_number_between(1,28);
    else
        var d = random_number_between(1,30);
    if (d < 10)
        var day = '0' + d;
    else
        var day = d;
    var y = random_number_between(1,22);
    if (y < 10)
        var yy = '0' + y;
    else
        var yy = y;
    return day + '.' + mes + '.' + yy;
}

export function random_date() {
    return '-------- не реализовано ------';
}

export function random_from_list() {
    const codeList = ['nabor_1', 'nabor_2', 'nabor_3', 'nabor_4', 'nabor_5'];
    let code = codeList[Math.floor(Math.random() * codeList.length)];
    return code;
}

