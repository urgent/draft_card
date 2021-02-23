import { calculate } from './Draft'
test('Pick calculates correctly from draft order and rounds', async () => {
    expect(calculate({ draft_order: ["AAA", "BBB"], rounds: 0, picks: [] })).toEqual([]);
    expect(calculate({ draft_order: [], rounds: 1, picks: [] })).toEqual([]);
    expect(calculate({ draft_order: [], rounds: 2, picks: [] })).toEqual([]);
    expect(calculate({ draft_order: ["AAA", "BBB"], rounds: 1, picks: [] })).toEqual(["AAA", "BBB"]);
    expect(calculate({ draft_order: ["AAA", "BBB"], rounds: 2, picks: [] })).toEqual(["AAA", "BBB", "AAA", "BBB"]);
    const res = calculate({ draft_order: ["AAA", "BBB"], rounds: 10, picks: [] });
    expect(res).toEqual(["AAA", "BBB", "AAA", "BBB"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC"], rounds: 1, picks: [] })).toEqual(["AAA", "BBB", "CCC"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC"], rounds: 2, picks: [] })).toEqual(["AAA", "BBB", "CCC", "AAA"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC"], rounds: 3, picks: [] })).toEqual(["AAA", "BBB", "CCC", "AAA"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ"], rounds: 1, picks: [] })).toEqual(["AAA", "BBB", "CCC", "DDD"]);
    expect(calculate({ draft_order: ["AAA", "BBB", "CCC", "DDD", "EEE", "FFF", "GGG", "HHH", "III", "JJJ"], rounds: 2, picks: [] })).toEqual(["AAA", "BBB", "CCC", "DDD"]);
})