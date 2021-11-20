//Fungsi untuk format angka menjadi uang
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

//Fungsi untuk mengubah format uang ke angka
String.prototype.toNumber = function () {
    var s = this;
    return s.replace(/,/g, "");
}

/**
 * Rumus PMT() di Excel
 * Khusus untuk menghitung cicilan kredit
    * ir   - interest rate per month
    * np   - number of periods (months)
    * pv   - present value
    * fv   - future value
    * type - when the payments are due:
    *        0: end of the period, e.g. end of month (default)
    *        1: beginning of period
 * @type Number
 */
function pmt(ir, np, pv, fv, type) {
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0)
        return -(pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = - ir * pv * (pvif + fv) / (pvif - 1);

    if (type === 1)
        pmt /= (1 + ir);

    return pmt;
}

//Ini fungsi panggil ajax kita sendiri, ini fungsi untuk kredit otomotif
function ajaxCalculateAutomotive(data, installment_period) {
    // jQuery('#calc').text('Loading ..');
    jQuery.post("/ajax/calculate", { 'data': data }, function (result) {
        // var result = {"main":{"addm":[{"tenor":12,"bulan":11,"suku_bunga":5.78,"tdp":30852000,"angsuran":7052000},{"tenor":24,"bulan":23,"suku_bunga":6.82,"tdp":28140500,"angsuran":3788000},{"tenor":36,"bulan":35,"suku_bunga":7.25,"tdp":27513500,"angsuran":2706000},{"tenor":48,"bulan":47,"suku_bunga":7.48,"tdp":27363500,"angsuran":2166000},{"tenor":60,"bulan":59,"suku_bunga":7.68,"tdp":27368500,"angsuran":1846000}],"addb":[{"tenor":12,"bulan":12,"suku_bunga":6.68,"tdp":23800000,"angsuran":7112000},{"tenor":24,"bulan":24,"suku_bunga":7.37,"tdp":24352500,"angsuran":3825000},{"tenor":36,"bulan":36,"suku_bunga":7.65,"tdp":24807500,"angsuran":2733000},{"tenor":48,"bulan":48,"suku_bunga":7.81,"tdp":25197500,"angsuran":2188000},{"tenor":60,"bulan":60,"suku_bunga":7.96,"tdp":25522500,"angsuran":1864000}]},"side":{"name":"New Car Jawa","otr":"100000000","addm":{"12":{"huru_hara":0,"total_dp":30852000,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":650000,"rp_insurance_cash":650000,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":650000,"total_insurance_cash":650000,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0578,"rate_tenor":0.0578,"rp_rate":4624000,"selisih_bunga":0,"bunga_after_subsidi":4624000,"tahun":1,"pokok_plus_bunga":84624000,"angsuran":7052000,"tdp":30852000,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":12,"month_min_one":11,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":1,"otr_with_depreciation":100000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":650000,"casco":650000,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0},"24":{"huru_hara":0,"total_dp":28140500,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":1202500,"rp_insurance_cash":1202500,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":1202500,"total_insurance_cash":1202500,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0682,"rate_tenor":0.1364,"rp_rate":10912000,"selisih_bunga":0,"bunga_after_subsidi":10912000,"tahun":2,"pokok_plus_bunga":90912000,"angsuran":3788000,"tdp":28140500,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":24,"month_min_one":23,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":0.85,"otr_with_depreciation":85000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":552500,"casco":1202500,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0},"36":{"huru_hara":0,"total_dp":27513500,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":1657500,"rp_insurance_cash":1657500,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":1657500,"total_insurance_cash":1657500,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0725,"rate_tenor":0.2175,"rp_rate":17400000,"selisih_bunga":0,"bunga_after_subsidi":17400000,"tahun":3,"pokok_plus_bunga":97400000,"angsuran":2706000,"tdp":27513500,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":36,"month_min_one":35,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":0.7,"otr_with_depreciation":70000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":455000,"casco":1657500,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0},"48":{"huru_hara":0,"total_dp":27363500,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":2047500,"rp_insurance_cash":2047500,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":2047500,"total_insurance_cash":2047500,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0748,"rate_tenor":0.2992,"rp_rate":23936000,"selisih_bunga":0,"bunga_after_subsidi":23936000,"tahun":4,"pokok_plus_bunga":103936000,"angsuran":2166000,"tdp":27363500,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":48,"month_min_one":47,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":0.6,"otr_with_depreciation":60000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":390000,"casco":2047500,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0},"60":{"huru_hara":0,"total_dp":27368500,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":2372500,"rp_insurance_cash":2372500,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":2372500,"total_insurance_cash":2372500,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0768,"rate_tenor":0.384,"rp_rate":30720000,"selisih_bunga":0,"bunga_after_subsidi":30720000,"tahun":5,"pokok_plus_bunga":110720000,"angsuran":1846000,"tdp":27368500,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":60,"month_min_one":59,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":0.5,"otr_with_depreciation":50000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":325000,"casco":2372500,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0}},"addb":{"12":{"huru_hara":0,"total_dp":23800000,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":650000,"rp_insurance_cash":650000,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":650000,"total_insurance_cash":650000,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0668,"rate_tenor":0.0668,"rp_rate":5344000,"selisih_bunga":0,"bunga_after_subsidi":5344000,"tahun":1,"pokok_plus_bunga":85344000,"angsuran":7112000,"tdp":23800000,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":12,"month_min_one":11,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":1,"otr_with_depreciation":100000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":650000,"casco":650000,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0},"24":{"huru_hara":0,"total_dp":24352500,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":1202500,"rp_insurance_cash":1202500,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":1202500,"total_insurance_cash":1202500,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0737,"rate_tenor":0.1474,"rp_rate":11792000,"selisih_bunga":0,"bunga_after_subsidi":11792000,"tahun":2,"pokok_plus_bunga":91792000,"angsuran":3825000,"tdp":24352500,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":24,"month_min_one":23,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":0.85,"otr_with_depreciation":85000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":552500,"casco":1202500,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0},"36":{"huru_hara":0,"total_dp":24807500,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":1657500,"rp_insurance_cash":1657500,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":1657500,"total_insurance_cash":1657500,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0765,"rate_tenor":0.2295,"rp_rate":18360000,"selisih_bunga":0,"bunga_after_subsidi":18360000,"tahun":3,"pokok_plus_bunga":98360000,"angsuran":2733000,"tdp":24807500,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":36,"month_min_one":35,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":0.7,"otr_with_depreciation":70000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":455000,"casco":1657500,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0},"48":{"huru_hara":0,"total_dp":25197500,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":2047500,"rp_insurance_cash":2047500,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":2047500,"total_insurance_cash":2047500,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0781,"rate_tenor":0.3124,"rp_rate":24992000,"selisih_bunga":0,"bunga_after_subsidi":24992000,"tahun":4,"pokok_plus_bunga":104992000,"angsuran":2188000,"tdp":25197500,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":48,"month_min_one":47,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":0.6,"otr_with_depreciation":60000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":390000,"casco":2047500,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0},"60":{"huru_hara":0,"total_dp":25522500,"teroris_percentage":0,"teroris_per_tenor":0,"teroris":0,"tjh_per_tenor":0,"tjh_insurance":0,"pengemudi_per_tenor":null,"pengemudi_all_tenor":0,"penumpang_per_tenor":null,"penumpang_all_tenor":0,"total_ap":0,"rp_insurance":2372500,"rp_insurance_cash":2372500,"acp":null,"total_acp":0,"total_acp_cash":0,"gap":0,"total_gap":0,"total_gap_cash":0,"hic":null,"total_hic_cash":null,"total_insurance":2372500,"total_insurance_cash":2372500,"total_insurance_credit":0,"persen_net_dp":0.2,"ltv":80000000,"product_rate":0.0796,"rate_tenor":0.398,"rp_rate":31840000,"selisih_bunga":0,"bunga_after_subsidi":31840000,"tahun":5,"pokok_plus_bunga":111840000,"angsuran":1864000,"tdp":25522500,"provisi_cash":800000,"provisi_percentage":0.01,"ltv_sebelum_hit_provisi":80000000,"provisi":800000,"bulan":60,"month_min_one":59,"adm_plus_fiducia":2150000,"biaya_admin":1600000,"fiducia":550000,"depresiasi":0.5,"otr_with_depreciation":50000000,"casco_type":1,"casco_rate":0.0065,"loading_percentage":0,"casco_per_tenor_with_loading":325000,"casco":2372500,"banjir_percentage":0,"banjir_per_tenor":0,"banjir":0,"gempa_percenage":0,"gempa_per_tenor":0,"gempa":0,"huru_hara_percentage":0,"huru_hara_per_tenor":0}}}};
        // console.log(result);
        result = jQuery.parseJSON(result);
        //addm
        var addm = result.main.addm;
        var addmHtml = "";
        for (i = 0; i < addm.length; i++) {
            if (i >= installment_period) break

            var numMonths = addm[i].bulan;
            var firstMonth = addm[i].tdp.formatMoney(0);
            var installment = addm[i].angsuran.formatMoney(0);
            addmHtml += "<div><h5>" + numMonths + " Bulan</h5><p>Total Bayar Pertama<br/> Rp " + firstMonth + ",-</p><p>Angsuran: <br/>Rp. " + installment + "</p></div>";
        }

        //addb
        var addb = result.main.addb;
        var addbHtml = "";
        for (i = 0; i < addb.length; i++) {
            if (i >= installment_period) break;

            var numMonths = addb[i].bulan;
            var firstMonth = addb[i].tdp.formatMoney(0);
            var installment = addb[i].angsuran.formatMoney(0);
            addbHtml += "<div><h5>" + numMonths + " Bulan</h5><p>Total Bayar Pertama<br/> Rp " + firstMonth + ",-</p><p>Angsuran: <br/>Rp. " + installment + "</p></div>";
        }

        var result = "<h3>ADDM</h3><p>Angsuran dibayar dimuka</p><div class='result addm-result'>" + addmHtml + "</div><h3>ADDB</h3><p>Angsuran dibayar dibelakang</p><div class='result addb-result'>" + addbHtml + "</div>";

        jQuery(".calculate-result-holder").html(result);
        $('html, body').animate({
            scrollTop: parseInt($(".calculate-result-holder").offset().top)
        }, 1000);
        jQuery('#calc').html('Hitung');
    });
}


function ajaxCalculateAutomotiveBudget(data, installment_period) {
    // jQuery('#calc').text('Loading ..');
    jQuery.post("/ajax/calculate-budget", { 'data': data }, function (result) {
        result = jQuery.parseJSON(result);

        if (result.length == 0) {
            jQuery(".calculate-result-holder").html("Maaf, tidak dapat menghitung hasil.");
            jQuery('#calc').html('Hitung');
        }

        //addm
        var addm = result.addm;
        var addmHtml = "";
        for (i = 0; i < addm.length; i++) {
            if (i >= installment_period) break

            var numMonths = addm[i].bulan;
            var firstMonth = addm[i].tdp.formatMoney(0);
            var installment = addm[i].angsuran.formatMoney(0);
            addmHtml += "<div><h5>" + numMonths + " Bulan</h5><p>Total Bayar Pertama<br/> Rp " + firstMonth + ",-</p><p>Angsuran: <br/>Rp. " + installment + "</p></div>";
        }

        //addb
        var addb = result.addb;
        var addbHtml = "";
        for (i = 0; i < addb.length; i++) {
            if (i >= installment_period) break;

            var numMonths = addb[i].bulan;
            var firstMonth = addb[i].tdp.formatMoney(0);
            var installment = addb[i].angsuran.formatMoney(0);
            addbHtml += "<div><h5>" + numMonths + " Bulan</h5><p>Total Bayar Pertama<br/> Rp " + firstMonth + ",-</p><p>Angsuran: <br/>Rp. " + installment + "</p></div>";
        }

        var result = "<h3>ADDM</h3><p>Angsuran dibayar dimuka</p><div class='result addm-result'>" + addmHtml + "</div><h3>ADDB</h3><p>Angsuran dibayar dibelakang</p><div class='result addb-result'>" + addbHtml + "</div>";

        jQuery(".calculate-result-holder .content").html(result);
        $('html, body').animate({
            scrollTop: parseInt($(".calculate-result-holder").offset().top)
        }, 1000);
        jQuery('#calc').html('Hitung');
    });
}

//Ini fungsi panggil ajax kita sendiri, ini fungsi untuk kredit multiguna
function ajaxCalculateMultipurpose(data, installment_period) {
    // jQuery('#calc').text('Loading ..');
    jQuery.post("/ajax/calculate", { 'data': data }, function (result) {
        result = jQuery.parseJSON(result);
        //addm
        var addm = result.main.addm;
        var addmHtml = "";
        for (i = 0; i < addm.length; i++) {
            if (i >= installment_period) break

            var numMonths = addm[i].bulan;
            var cashOut = (parseInt(data.otr) - parseInt(addm[i].tdp)).formatMoney(0);
            var installment = addm[i].angsuran.formatMoney(0);
            addmHtml += "<div><h5>" + numMonths + " Bulan</h5><p>Pencairan<br/> Rp " + cashOut + ",-</p><p>Angsuran: <br/>Rp. " + installment + "</p></div>";
        }

        //addb
        var addb = result.main.addb;
        var addbHtml = "";
        for (i = 0; i < addb.length; i++) {
            if (i >= installment_period) break;

            var numMonths = addb[i].bulan;
            var cashOut = (parseInt(data.otr) - parseInt(addb[i].tdp)).formatMoney(0);
            var installment = addb[i].angsuran.formatMoney(0);
            addbHtml += "<div><h5>" + numMonths + " Bulan</h5><p>Pencairan<br/> Rp " + cashOut + ",-</p><p>Angsuran: <br/>Rp. " + installment + "</p></div>";
        }

        var result = "<h3>ADDM</h3><div class='result addm-result'>" + addmHtml + "</div><h3>ADDB</h3><div class='result addb-result'>" + addbHtml + "</div>";

        jQuery(".calculate-result-holder").html(result);
        $('html, body').animate({
            scrollTop: parseInt($(".calculate-result-holder").offset().top)
        }, 1000);
        jQuery('#calc').html('Hitung');
    });
}


jQuery(document).ready(function ($) {
    $(".jumlahPinjamanSlider").slider({
        range: "min",
        value: 1,
        step: 100000,
        min: 0,
        max: 2500000000,
        slide: function (event, ui) {
            $(".jumlahPinjamanValue").val(ui.value.formatMoney(0));
        }
    });

    $(".hargaKendaraanSlider").slider({
        range: "min",
        value: 1,
        step: 100000,
        min: 0,
        max: 500000000,
        slide: function (event, ui) {
            $(".hargaKendaraanValue").val(ui.value.formatMoney(0));
        }
    });

    $(".uangMukaSlider").slider({
        range: "min",
        value: 1,
        step: 100000,
        min: 0,
        max: 500000000,
        slide: function (event, ui) {
            console.log(ui);
            $(".uangMukaValue").val(ui.value.formatMoney(0));
        }
    });


    $(".sukuBungaSlider").slider({
        range: "min",

        step: 0.25,
        min: 0,
        max: 20,
        slide: function (event, ui) {
            $(".sukuBungaValue").val(ui.value);
        }
    });

    var monthName = 'Bulan';
    //variable lang di deklarasikan di /index.php
    // if (lang === 'en') {
    //     monthName = 'Month';
    // }

    $(".jangkaWaktuSlider").slider({
        range: "min",
        value: 12,
        step: 12,
        min: 12,
        max: 60,
        slide: function (event, ui) {
            $(".jangkaWaktuValue").html(ui.value + " " + monthName + ((lang == 'en') && (ui.value > 1) ? 's' : ''));
        }
    });

    $(".uangMukaSlider").slider({
        range: "min",

        step: 1,
        min: 20,
        max: 100,
        slide: function (event, ui) {
            $(".uangMukaValue").html(ui.value + " %");
        }
    });

    $('.header-slider').flexslider({
        animation: "slide",
        controlNav: true
    });

    $("#calc").click(function () {
        var interestRate = $(".uangMukaSlider").slider("option", "value");
        var numberOfPeriod = $(".jangkaWaktuSlider").slider("option", "value");
        var price = $(".jumlahPinjamanSlider").slider("option", "value");

        var data = {
            "area": 1,
            "location": 2,
            "dp_persen": interestRate,
            "fiducia": 2,
            "jenis_asuransi": 1,
            "pembayaran_asuransi": 1,
            "otr": price,
            "tahun_kendaraan": 2019,
            "is_multiguna": 0
        };

        jQuery.post("/ajax/calculate", { 'data': data }, function (result) {
            result = jQuery.parseJSON(result);

            if (result.length == 0) {
                jQuery(".calculate-result-holder").html("Maaf, tidak dapat menghitung hasil.");
                jQuery('#calc').html('Hitung');
            }

            //addm
            var addm = result.main.addm;
            for (i = 0; i < addm.length; i++) {
                if (addm[i].tenor != numberOfPeriod) continue;

                $("#result_addm").html(addm[i].angsuran.formatMoney(0));
            }

            //addb
            var addb = result.main.addb;
            for (i = 0; i < addb.length; i++) {
                if (addb[i].tenor != numberOfPeriod) continue;

                $("#result_addb").html(addb[i].angsuran.formatMoney(0));
            }
        });
    });

    $('#credit-simulation .jumlahPinjamanValue').change(function () {
        var number = $(this).val();
        var newNumber = number.replace(/,/g, '');

        $('.jumlahPinjamanSlider').slider('value', parseInt(newNumber));
    });



    //Fungsi reset form
    $("#reset").click(function () {
        $("#result_addb").html("0");
        $("#result_addm").html("0");
        $(".jumlahPinjamanSlider").slider({ value: 1 });
        $(".jumlahPinjamanValue").val(0);
        $(".sukuBungaSlider").slider({ value: 0 });
        $(".sukuBungaValue").val(0);
        $(".uangMukaSlider").slider({ value: 0 });
        $(".uangMukaValue").text("0%");
        $(".jangkaWaktuSlider").slider({ value: 12 });
        $(".jangkaWaktuValue").text("12 Bulan");

    });

});