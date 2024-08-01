import { Util } from "./util";

interface IApiLinks {
    comicDetails: string;
    chaptersList: string;
    comicSearch: string;
}

class DefaultApiLinks implements IApiLinks {
    comicDetails = "https://copymanga.site/comic/%s";
    chaptersList = "https://copymanga.site/comicdetail/%s/chapters";
    comicSearch = "https://copymanga.site/comicdetail/%s/chapters";
}

class MobileH5ApiLinks extends DefaultApiLinks {
    comicDetails = "https://copymanga.site/h5/details/comic/%s";
    chaptersList = "https://copymanga.site/comicdetail/%s/chapters";
}

export default Util.IsMobileDevice() ? new MobileH5ApiLinks() : new DefaultApiLinks();
