const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getLeagueDashLineupsFromJson = async(request, response, next) => {
    let season = request.params;
    console.log(season);
    try {
        let stats = await require(`../juicystats/leaguedashlineups${season.season}.json`);
        console.log(stats);
        response.status(200).send(stats);
    } catch (error) {
        return next(error);
    }
}

const createLeagueDashLineups = (request, response, next) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "leaguedashlineups${season.season}" (group_set, group_id, group_name, team_id, team_abbreviation, gp, w, l, w_pct, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, tov, stl, blk, blka, pf, pfd, pts, plus_minus, gp_rank, w_rank, l_rank, w_pct_rank, min_rank, fgm_rank, fga_rank, fg_pct_rank, fg3m_rank, fg3a_rank, fg3_pct_rank, ftm_rank, fta_rank, ft_pct_rank, oreb_rank, dreb_rank, reb_rank, ast_rank, tov_rank, stl_rank, blk_rank, blka_rank, pf_rank, pfd_rank, pts_rank, plus_minus_rank) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57)`, 
  [body[0], body[1], body[2], body[3].toString(), body[4], body[5].toString(), body[6].toString(), body[7].toString(), body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21].toString(), body[22].toString(), body[23].toString(), body[24].toString(), body[25].toString(), body[26].toString(), body[27].toString(), body[28].toString(), body[29].toString(), body[30].toString(), body[31].toString(), body[32].toString(), body[33].toString(), body[34].toString(), body[35].toString(), body[36].toString(), body[37].toString(), body[38].toString(), body[39].toString(), body[40].toString(), body[41].toString(), body[42].toString(), body[43].toString(), body[44].toString(), body[45].toString(), body[46].toString(), body[47].toString(), body[48].toString(), body[49].toString(), body[50].toString(), body[51].toString(), body[52].toString(), body[53].toString(), body[54].toString(), body[55].toString(), body[56].toString()], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}

module.exports = {
    createLeagueDashLineups,
    getLeagueDashLineupsFromJson,
}