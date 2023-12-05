export const TEXT = {
    DESCRIPTION:{
    SITE_NAME_TEMPLATE_DEFINITION: ` | 'quoted text' - any text, no variables;
    \n | %MSID(8)% - variable, equal to 8 first symbols of original site MSID, %MSID(0,8)% - the same as above;
    \n | %MSID(4,8)% - variable, equal to 8 symbols of original site MSID, starting from 4th symbol;
    \n | %LIST_INDEX% - variable, equal to index of current item in list;
    `,
    },
    PLACEHOLDER:{
        MSID_LIST: `List of the target sites MSID's, formatted in any reasonoble maner: 
    \n | "quoted" or not;
    \n | separated by dot, comma, both (;); 
    \n | spce(es), new line(es);
    `,
    }
}