const asciiCodes = [
    { code: 0, symbol: "NULL", description: "(Null character)" },
    { code: 1, symbol: "SOH", description: "(Start of Header)" },
    { code: 2, symbol: "STX", description: "(Start of Text)" },
    { code: 3, symbol: "ETX", description: "(End of Text)" },
    { code: 4, symbol: "EOT", description: "(End of Transmission)" },
    { code: 5, symbol: "ENQ", description: "(Enquiry)" },
    { code: 6, symbol: "ACK", description: "(Acknowledgement)" },
    { code: 7, symbol: "BEL", description: "(Bell)" },
    { code: 8, symbol: "BS", description: "(Backspace)" },
    { code: 9, symbol: "HT", description: "(Horizontal Tab)" },
    { code: 10, symbol: "LF", description: "(Line feed)" },
    { code: 11, symbol: "VT", description: "(Vertical Tab)" },
    { code: 12, symbol: "FF", description: "(Form feed)" },
    { code: 13, symbol: "CR", description: "(Carriage return)" },
    { code: 14, symbol: "SO", description: "(Shift Out)" },
    { code: 15, symbol: "SI", description: "(Shift In)" },
    { code: 16, symbol: "DLE", description: "(Data link escape)" },
    { code: 17, symbol: "DC1", description: "(Device control 1)" },
    { code: 18, symbol: "DC2", description: "(Device control 2)" },
    { code: 19, symbol: "DC3", description: "(Device control 3)" },
    { code: 20, symbol: "DC4", description: "(Device control 4)" },
    { code: 21, symbol: "NAK", description: "(Negative acknowledgement)" },
    { code: 22, symbol: "SYN", description: "(Synchronous idle)" },
    { code: 23, symbol: "ETB", description: "(End of transmission block)" },
    { code: 24, symbol: "CAN", description: "(Cancel)" },
    { code: 25, symbol: "EM", description: "(End of medium)" },
    { code: 26, symbol: "SUB", description: "(Substitute)" },
    { code: 27, symbol: "ESC", description: "(Escape)" },
    { code: 28, symbol: "FS", description: "(File separator)" },
    { code: 29, symbol: "GS", description: "(Group separator)" },
    { code: 30, symbol: "RS", description: "(Record separator)" },
    { code: 31, symbol: "US", description: "(Unit separator)" },
    { code: 32, symbol: " ", description: "(space)" },
    { code: 33, symbol: "!", description: "(exclamation mark)" },
    { code: 34, symbol: '"', description: "(Quotation mark)" },
    { code: 35, symbol: "#", description: "(Number sign)" },
    { code: 36, symbol: "$", description: "(Dollar sign)" },
    { code: 37, symbol: "%", description: "(Percent sign)" },
    { code: 38, symbol: "&", description: "(Ampersand)" },
    { code: 39, symbol: "'", description: "(Apostrophe)" },
    { code: 40, symbol: "(", description: "(round brackets or parentheses)" },
    { code: 41, symbol: ")", description: "(round brackets or parentheses)" },
    { code: 42, symbol: "*", description: "(Asterisk)" },
    { code: 43, symbol: "+", description: "(Plus sign)" },
    { code: 44, symbol: ",", description: "(Comma)" },
    { code: 45, symbol: "-", description: "(Hyphen)" },
    { code: 46, symbol: ".", description: "(Full stop, dot)" },
    { code: 47, symbol: "/", description: "(Slash)" },
    { code: 48, symbol: "0", description: "(number zero)" },
    { code: 49, symbol: "1", description: "(number one)" },
    { code: 50, symbol: "2", description: "(number two)" },
    { code: 51, symbol: "3", description: "(number three)" },
    { code: 52, symbol: "4", description: "(number four)" },
    { code: 53, symbol: "5", description: "(number five)" },
    { code: 54, symbol: "6", description: "(number six)" },
    { code: 55, symbol: "7", description: "(number seven)" },
    { code: 56, symbol: "8", description: "(number eight)" },
    { code: 57, symbol: "9", description: "(number nine)" },
    { code: 58, symbol: ":", description: "(Colon)" },
    { code: 59, symbol: ";", description: "(Semicolon)" },
    { code: 60, symbol: "<", description: "(Less-than sign)" },
    { code: 61, symbol: "=", description: "(Equals sign)" },
    { code: 62, symbol: ">", description: "(Greater-than sign; Inequality)" },
    { code: 63, symbol: "?", description: "(Question mark)" },
    { code: 64, symbol: "@", description: "(At sign)" },
    { code: 65, symbol: "A", description: "(Capital A)" },
    { code: 66, symbol: "B", description: "(Capital B)" },
    { code: 67, symbol: "C", description: "(Capital C)" },
    { code: 68, symbol: "D", description: "(Capital D)" },
    { code: 69, symbol: "E", description: "(Capital E)" },
    { code: 70, symbol: "F", description: "(Capital F)" },
    { code: 71, symbol: "G", description: "(Capital G)" },
    { code: 72, symbol: "H", description: "(Capital H)" },
    { code: 73, symbol: "I", description: "(Capital I)" },
    { code: 74, symbol: "J", description: "(Capital J)" },
    { code: 75, symbol: "K", description: "(Capital K)" },
    { code: 76, symbol: "L", description: "(Capital L)" },
    { code: 77, symbol: "M", description: "(Capital M)" },
    { code: 78, symbol: "N", description: "(Capital N)" },
    { code: 79, symbol: "O", description: "(Capital O)" },
    { code: 80, symbol: "P", description: "(Capital P)" },
    { code: 81, symbol: "Q", description: "(Capital Q)" },
    { code: 82, symbol: "R", description: "(Capital R)" },
    { code: 83, symbol: "S", description: "(Capital S)" },
    { code: 84, symbol: "T", description: "(Capital T)" },
    { code: 85, symbol: "U", description: "(Capital U)" },
    { code: 86, symbol: "V", description: "(Capital V)" },
    { code: 87, symbol: "W", description: "(Capital W)" },
    { code: 88, symbol: "X", description: "(Capital X)" },
    { code: 89, symbol: "Y", description: "(Capital Y)" },
    { code: 90, symbol: "Z", description: "(Capital Z)" },
    { code: 91, symbol: "[", description: "(square brackets or box brackets)" },
    { code: 92, symbol: "\\", description: "(Backslash)" },
    { code: 93, symbol: "]", description: "(square brackets or box brackets)" },
    { code: 94, symbol: "^", description: "(Caret or circumflex accent)" },
    { code: 95, symbol: "_", description: "(underscore, under strike, underbar or low line)" },
    { code: 96, symbol: "`", description: "(Grave accent)" },
    { code: 97, symbol: "a", description: "(Lowercase a)" },
    { code: 98, symbol: "b", description: "(Lowercase b)" },
    { code: 99, symbol: "c", description: "(Lowercase c)" },
    { code: 100, symbol: "d", description: "(Lowercase d)" },
    { code: 101, symbol: "e", description: "(Lowercase e)" },
    { code: 102, symbol: "f", description: "(Lowercase f)" },
    { code: 103, symbol: "g", description: "(Lowercase g)" },
    { code: 104, symbol: "h", description: "(Lowercase h)" },
    { code: 105, symbol: "i", description: "(Lowercase i)" },
    { code: 106, symbol: "j", description: "(Lowercase j)" },
    { code: 107, symbol: "k", description: "(Lowercase k)" },
    { code: 108, symbol: "l", description: "(Lowercase l)" },
    { code: 109, symbol: "m", description: "(Lowercase m)" },
    { code: 110, symbol: "n", description: "(Lowercase n)" },
    { code: 111, symbol: "o", description: "(Lowercase o)" },
    { code: 112, symbol: "p", description: "(Lowercase p)" },
    { code: 113, symbol: "q", description: "(Lowercase q)" },
    { code: 114, symbol: "r", description: "(Lowercase r)" },
    { code: 115, symbol: "s", description: "(Lowercase s)" },
    { code: 116, symbol: "t", description: "(Lowercase t)" },
    { code: 117, symbol: "u", description: "(Lowercase u)" },
    { code: 118, symbol: "v", description: "(Lowercase v)" },
    { code: 119, symbol: "w", description: "(Lowercase w)" },
    { code: 120, symbol: "x", description: "(Lowercase x)" },
    { code: 121, symbol: "y", description: "(Lowercase y)" },
    { code: 122, symbol: "z", description: "(Lowercase z)" },
    { code: 123, symbol: "{", description: "(curly brackets or braces)" },
    { code: 124, symbol: "|", description: "(vertical-bar, vbar, vertical line or vertical slash)" },
    { code: 125, symbol: "}", description: "(curly brackets or braces)" },
    { code: 126, symbol: "~", description: "(Tilde; swung dash)" },
    { code: 127, symbol: "DEL", description: "(Delete)" },
    { code: 128, symbol: "Ç", description: "(Majuscule C-cedilla)" },
    { code: 129, symbol: "ü", description: "(letter 'u' with umlaut or diaeresis; 'u-umlaut')" },
    { code: 130, symbol: "é", description: "(letter 'e' with acute accent or 'e-acute')" },
    { code: 131, symbol: "â", description: "(letter 'a' with circumflex accent or 'a-circumflex')" },
    { code: 132, symbol: "ä", description: "(letter 'a' with umlaut or diaeresis; 'a-umlaut')" },
    { code: 133, symbol: "à", description: "(letter 'a' with grave accent)" },
    { code: 134, symbol: "å", description: "(letter 'a' with a ring)" },
    { code: 135, symbol: "ç", description: "(Minuscule c-cedilla)" },
    { code: 136, symbol: "ê", description: "(letter 'e' with circumflex accent or 'e-circumflex')" },
    { code: 137, symbol: "ë", description: "(letter 'e' with umlaut or diaeresis; 'e-umlaut')" },
    { code: 138, symbol: "è", description: "(letter 'e' with grave accent)" },
    { code: 139, symbol: "ï", description: "(letter 'i' with umlaut or diaeresis; 'i-umlaut')" },
    { code: 140, symbol: "î", description: "(letter 'i' with circumflex accent or 'i-circumflex')" },
    { code: 141, symbol: "ì", description: "(letter 'i' with grave accent)" },
    { code: 142, symbol: "Ä", description: "(letter 'A' with umlaut or diaeresis; 'A-umlaut')" },
    { code: 143, symbol: "Å", description: "(letter 'A' with a ring)" },
    { code: 144, symbol: "É", description: "(Capital letter 'E' with acute accent or 'E-acute')" },
    { code: 145, symbol: "æ", description: "(Latin diphthong 'ae')" },
    { code: 146, symbol: "Æ", description: "(Latin diphthong 'AE')" },
    { code: 147, symbol: "ô", description: "(letter 'o' with circumflex accent or 'o-circumflex')" },
    { code: 148, symbol: "ö", description: "(letter 'o' with umlaut or diaeresis; 'o-umlaut')" },
    { code: 149, symbol: "ò", description: "(letter 'o' with grave accent)" },
    { code: 150, symbol: "û", description: "(letter 'u' with circumflex accent or 'u-circumflex')" },
    { code: 151, symbol: "ù", description: "(letter 'u' with grave accent)" },
    { code: 152, symbol: "ÿ", description: "(letter 'y' with diaeresis)" },
    { code: 153, symbol: "Ö", description: "(letter 'O' with umlaut or diaeresis; 'O-umlaut')" },
    { code: 154, symbol: "Ü", description: "(letter 'U' with umlaut or diaeresis; 'U-umlaut')" },
    { code: 155, symbol: "ø", description: "(slashed zero or empty set)" },
    { code: 156, symbol: "£", description: "(Pound sign; symbol for the pound sterling)" },
    { code: 157, symbol: "Ø", description: "(slashed zero or empty set)" },
    { code: 158, symbol: "×", description: "(multiplication sign)" },
    { code: 159, symbol: "ƒ", description: "(function sign; f with hook sign; florin sign)" },
    { code: 160, symbol: "á", description: "(letter 'a' with acute accent or 'a-acute')" },
    { code: 161, symbol: "í", description: "(letter 'i' with acute accent or 'i-acute')" },
    { code: 162, symbol: "ó", description: "(letter 'o' with acute accent or 'o-acute')" },
    { code: 163, symbol: "ú", description: "(letter 'u' with acute accent or 'u-acute')" },
    { code: 164, symbol: "ñ", description: "(letter 'n' with tilde; enye)" },
    { code: 165, symbol: "Ñ", description: "(letter 'N' with tilde; enye)" },
    { code: 166, symbol: "ª", description: "(feminine ordinal indicator)" },
    { code: 167, symbol: "º", description: "(masculine ordinal indicator)" },
    { code: 168, symbol: "¿", description: "(Inverted question marks)" },
    { code: 169, symbol: "®", description: "(Registered trademark symbol)" },
    { code: 170, symbol: "¬", description: "(Logical negation symbol)" },
    { code: 171, symbol: "½", description: "(One half)" },
    { code: 172, symbol: "¼", description: "(Quarter or one fourth)" },
    { code: 173, symbol: "¡", description: "(Inverted exclamation marks)" },
    { code: 174, symbol: "«", description: "(Guillemets or angle quotes)" },
    { code: 175, symbol: "»", description: "(Guillemets or angle quotes)" },
    { code: 176, symbol: "░", description: "" },
    { code: 177, symbol: "▒", description: "" },
    { code: 178, symbol: "▓", description: "" },
    { code: 179, symbol: "│", description: "(Box drawing character)" },
    { code: 180, symbol: "┤", description: "(Box drawing character)" },
    { code: 181, symbol: "Á", description: "(Capital letter 'A' with acute accent or 'A-acute')" },
    { code: 182, symbol: "Â", description: "(letter 'A' with circumflex accent or 'A-circumflex')" },
    { code: 183, symbol: "À", description: "(letter 'A' with grave accent)" },
    { code: 184, symbol: "©", description: "(Copyright symbol)" },
    { code: 185, symbol: "╣", description: "(Box drawing character)" },
    { code: 186, symbol: "║", description: "(Box drawing character)" },
    { code: 187, symbol: "╗", description: "(Box drawing character)" },
    { code: 188, symbol: "╝", description: "(Box drawing character)" },
    { code: 189, symbol: "¢", description: "(Cent symbol)" },
    { code: 190, symbol: "¥", description: "(YEN and YUAN sign)" },
    { code: 191, symbol: "┐", description: "(Box drawing character)" },
    { code: 192, symbol: "└", description: "(Box drawing character)" },
    { code: 193, symbol: "┴", description: "(Box drawing character)" },
    { code: 194, symbol: "┬", description: "(Box drawing character)" },
    { code: 195, symbol: "├", description: "(Box drawing character)" },
    { code: 196, symbol: "─", description: "(Box drawing character)" },
    { code: 197, symbol: "┼", description: "(Box drawing character)" },
    { code: 198, symbol: "ã", description: "(letter 'a' with tilde or 'a-tilde')" },
    { code: 199, symbol: "Ã", description: "(letter 'A' with tilde or 'A-tilde')" },
    { code: 200, symbol: "╚", description: "(Box drawing character)" },
    { code: 201, symbol: "╔", description: "(Box drawing character)" },
    { code: 202, symbol: "╩", description: "(Box drawing character)" },
    { code: 203, symbol: "╦", description: "(Box drawing character)" },
    { code: 204, symbol: "╠", description: "(Box drawing character)" },
    { code: 205, symbol: "═", description: "(Box drawing character)" },
    { code: 206, symbol: "╬", description: "(Box drawing character)" },
    { code: 207, symbol: "¤", description: "(generic currency sign)" },
    { code: 208, symbol: "ð", description: "(lowercase 'eth')" },
    { code: 209, symbol: "Ð", description: "(Capital letter 'Eth')" },
    { code: 210, symbol: "Ê", description: "(letter 'E' with circumflex accent or 'E-circumflex')" },
    { code: 211, symbol: "Ë", description: "(letter 'E' with umlaut or diaeresis; 'E-umlaut')" },
    { code: 212, symbol: "È", description: "(letter 'E' with grave accent)" },
    { code: 213, symbol: "ı", description: "(lowercase dot less i)" },
    { code: 214, symbol: "Í", description: "(Capital letter 'I' with acute accent or 'I-acute')" },
    { code: 215, symbol: "Î", description: "(letter 'I' with circumflex accent or 'I-circumflex')" },
    { code: 216, symbol: "Ï", description: "(letter 'I' with umlaut or diaeresis; 'I-umlaut')" },
    { code: 217, symbol: "┘", description: "(Box drawing character)" },
    { code: 218, symbol: "┌", description: "(Box drawing character)" },
    { code: 219, symbol: "█", description: "(Block)" },
    { code: 220, symbol: "▄", description: "" },
    { code: 221, symbol: "¦", description: "(vertical broken bar)" },
    { code: 222, symbol: "Ì", description: "(letter 'I' with grave accent)" },
    { code: 223, symbol: "▀", description: "" },
    { code: 224, symbol: "Ó", description: "(Capital letter 'O' with acute accent or 'O-acute')" },
    { code: 225, symbol: "ß", description: "(letter 'Eszett'; 'scharfes S' or 'sharp S')" },
    { code: 226, symbol: "Ô", description: "(letter 'O' with circumflex accent or 'O-circumflex')" },
    { code: 227, symbol: "Ò", description: "(letter 'O' with grave accent)" },
    { code: 228, symbol: "õ", description: "(letter 'o' with tilde or 'o-tilde')" },
    { code: 229, symbol: "Õ", description: "(letter 'O' with tilde or 'O-tilde')" },
    { code: 230, symbol: "µ", description: "(Lowercase letter 'Mu'; micro sign or micron)" },
    { code: 231, symbol: "þ", description: "(capital letter 'Thorn')" },
    { code: 232, symbol: "Þ", description: "(lowercase letter 'thorn')" },
    { code: 233, symbol: "Ú", description: "(Capital letter 'U' with acute accent or 'U-acute')" },
    { code: 234, symbol: "Û", description: "(letter 'U' with circumflex accent or 'U-circumflex')" },
    { code: 235, symbol: "Ù", description: "(letter 'U' with grave accent)" },
    { code: 236, symbol: "ý", description: "(letter 'y' with acute accent)" },
    { code: 237, symbol: "Ý", description: "(Capital letter 'Y' with acute accent)" },
    { code: 238, symbol: "¯", description: "(macron symbol)" },
    { code: 239, symbol: "´", description: "(Acute accent)" },
    { code: 240, symbol: "¬", description: "(Hyphen)" },
    { code: 241, symbol: "±", description: "(Plus-minus sign)" },
    { code: 242, symbol: "‗", description: "(underline or underscore)" },
    { code: 243, symbol: "¾", description: "(three quarters)" },
    { code: 244, symbol: "¶", description: "(paragraph sign or pilcrow)" },
    { code: 245, symbol: "§", description: "(Section sign)" },
    { code: 246, symbol: "÷", description: "(The division sign; Obelus)" },
    { code: 247, symbol: "¸", description: "(cedilla)" },
    { code: 248, symbol: "°", description: "(degree symbol)" },
    { code: 249, symbol: "¨", description: "(Diaeresis)" },
    { code: 250, symbol: "•", description: "(Interpunct or space dot)" },
    { code: 251, symbol: "¹", description: "(superscript one)" },
    { code: 252, symbol: "³", description: "(cube or superscript three)" },
    { code: 253, symbol: "²", description: "(Square or superscript two)" },
    { code: 254, symbol: "■", description: "(black square)" },
    { code: 255, symbol: "nbsp", description: "(non-breaking space or no-break space)" }
  ]
const createUID=(num)=>{


    const str=`${num}`
    const splitted_string=str.split("")
    // find ascii version
    var ascii=[]
    for(let i in splitted_string){
        for(let x in asciiCodes){
            if(splitted_string[i]==asciiCodes[x]["symbol"]){
                ascii.push(asciiCodes[x]["code"])

            }

        }
    
    }
    var remainders=[]
    const divideByTwo=(n)=>{
        if(n%2==0){
            remainders.push(0)
        }
        else{
            remainders.push(1)
        }
    }

    
    for(let n in ascii){
        var updated_n=ascii[n]
        while(updated_n>2){
            divideByTwo(updated_n)
            updated_n=Math.floor(updated_n/2)
            
        }
        remainders.push(1)
        remainders.push("/")
    }
    const editRemainders=()=>{
        remainders.pop()
        var inner_remainder=remainders.join("").split("/")
        var storable=[]
    // reverse the numbers
    const reversed=[]
    for(let o in inner_remainder){
        reversed.push(inner_remainder[o].split("").reverse().join(""))
    }
    inner_remainder=reversed
    for(let inner_remainder_item in inner_remainder){
        const max_length=8
        const updated=[]
        while(inner_remainder[inner_remainder_item].length<8){
            inner_remainder[inner_remainder_item]="0"+inner_remainder[inner_remainder_item]
        }
        // updated.push(inner_remainder[inner_remainder_item])

    
    }
    return inner_remainder.join("")
    }
    const storable_data= editRemainders()
    return storable_data
}

module.exports=createUID